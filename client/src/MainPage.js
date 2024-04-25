
//import required libraries to implement in the mainpage
import React, {useState, useRef, useMemo, useEffect} from "react";

import TinderCard from "react-tinder-card";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import "./MainPage.css";
import Recipe from "./Recipe";
import Dropdown from 'react-bootstrap/Dropdown';
import Popup from 'reactjs-popup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Picker from 'emoji-picker-react';
import {CommentSection} from 'react-comments-section';
import {Link} from 'react-router-dom';
import ProfilePage from "./ProfilePage";
import {useLocation} from "react-router-dom";
import 'react-comments-section/dist/index.css'


// Reference: https://www.npmjs.com/package/react-tinder-card - Code Demo and Examples





function MainPage() {

  // The API key information
  const APP_ID = '8bbd57b4';
  const APP_KEY = '6424d94c5f215da7af69015836e315e8';


  // defining variables to call throughtout the file
  const [recipes, setRecipes] = useState([])
  const [childRefs, setChildRefs] = useState([]);
  const[search, setSearch] = useState("");
  const[query, setQuery] = useState('pasta');
  const [newCommentText, setNewCommentText] = useState('');
  const [imageData, setImageData] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentData] = useState([]);
  const [recipeLength, setRecipeLength] = useState(0);
  const location = useLocation();
  const username = new URLSearchParams(location.search).get("username");
  console.log("USERNAME", username);

  const[currentIndex, setCurrentIndex] = useState(recipes.length > 0 ? recipes.length - 1 : 0);
  console.log(recipes.length, "recipes", recipes)
  const currentIndexRef = useRef(currentIndex);
  
  console.log("RECIPES LENGTH", recipes.length);
  
  
  useEffect(() => {
    setChildRefs(Array(recipes.length).fill(null).map(() => React.createRef()));
  }, [recipes]);
  
  // connects to the edamam recipe API to fetch recipes and dispaly on the page
  useEffect( () =>{ 
  const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const data = await response.json()
      console.log(data);
      setRecipes(data.hits)
      setRecipeLength(data.hits.length - 1);
      };
 


  getRecipes();
}, []);
  

console.log(childRefs);

  
  console.log("currentIndex", currentIndex)

  // creates a modal to display the recipes fetched from the edamam API
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setShowModal(true);
    if (currentIndex >= 0 && recipes.length > currentIndex && recipes.length > 0) {
      // Adjust this if the recipe ID is stored differently
      const recipeId = recipes[currentIndex].recipe.label; 
      // Fetch comments for the currently selected recipe
      getComments(recipeId); 
    }
  };
  
  const[previousDirection, setPreviousDirection] = useState();
  
  // gets the liked comments
  const [likedComments, setLikedComments] = useState(() => {
    const storedLikedComments = JSON.parse(localStorage.getItem("likedComments"));
    return storedLikedComments || {};
  });

  // Update local storage when liked comments change 
  useEffect(() => {
    localStorage.setItem("likedComments", JSON.stringify(likedComments));
  }, [likedComments]);

    // Function to handle like button click for comments
  const handleLikeClick = (commentId) => {
    setLikedComments(prevLikedComments => ({
      ...prevLikedComments,
      [commentId]: !prevLikedComments[commentId]
    }));
  };
  
 // Function to handle comment deletion
  const handleDeleteComment = async (content) => {
    try {
      // Find the index of the comment with the specified content
      const index = comments.findIndex(comment => comment.content === content);
      if (index === -1) {
        throw new Error('Comment not found');
      }
  
      // Get the comment object to delete
      const commentToDelete = comments[index];
  
      // Send a delete request to the server
      const response = await fetch(`http://localhost:3001/comments/${commentToDelete._id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
  
      // Filter out the deleted comment from the comments state
      const updatedComments = comments.filter(comment => comment.content !== content);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting the comment:', error);
    }
  };

  const handleLikeRecipe = async (recipeName) => {
    try {
       // Function to get current user's ID
      const response = await fetch("http://localhost:3001/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username, 
          recipeName: recipeName,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to like recipe");
      }
      // Optionally, you can update the UI to indicate that the recipe is liked
    } catch (error) {
      console.error("Error liking recipe:", error.message);
      // Handle error
    }
  };
  
  
  
// updates the index
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canSwipe = currentIndex >= 0
  // can only swipe if index >= 0

  const swiped = (direction, recipeDelete, index) => {
    console.log("Deleting: " + recipeDelete)
    setPreviousDirection(direction)
    updateCurrentIndex(index + 1)
    if(direction == "right"){
      handleLikeRecipe(recipeDelete.label);
    }

  }
  const canGoBack = currentIndex < recipes.length - 1
  const outOfFrame = (recipe, index) => {
    console.log(recipe + ' left screen')
  }
  // Function to get the comments from the database
  const getComments = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:3001/comments?recipeId=${recipeId}`);
      if (!response.ok) {
        // Error handling
        throw new Error('Failed to get comments');
      }
      const data = await response.json();
      // getting the comments along with the image data
      const commentsWithData = data.map(comment => {
        return {
          ...comment,
          imagePath: `http://localhost:3001/${comment.imagePath}`,
          username: comment.username
         
        };
      });
      setComments(commentsWithData);
    } catch (error) {
      console.error('Error with comments: ', error);
      setComments([]);
    }
  };
  
  // Function to add a new comment
  const handleCommentSubmit = async (event, recipeId) => {
    event.preventDefault();
    try {
    // access the database
      const response = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
       body: JSON.stringify({ 
          content: newCommentText,
          username: username,
          recipeId: recipeId,
          imageData: imageData
        })
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setNewCommentText(''); // Clear input field after submission
    } catch (error) {
      // Error handling
      console.error('Error adding comment:', error);
    }
  };

  // Function to uplaod image
  const handleImageUpload = (files) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      // storing image data
      setImageData(event.target.result);

    };

    reader.onerror = (error) => {
      // Error handling
      console.error('Error reading file:', error);
    };


    reader.readAsDataURL(file);
};
useEffect(() => {
  console.log('Image Data:', imageData);
}, [imageData]);


  const swipe = async (dir) => {
    console.log("SWIPE: RECIPES LENGTH", recipes.length);
    console.log("SWIPE: CHILD REFS", childRefs[currentIndex]);
    if(canSwipe && currentIndex < recipes.length && childRefs[currentIndex] && childRefs[currentIndex].current) // index is within valid indices of db
    {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card in this direction
    }
  }
  const goBack = async () => {
    if(!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }
  

  return(
    

    <div className = 'background' style={{ textAlign:'center'}}>
      <div className = "profileicon">
      
      <Link to={`/ProfilePage?username=${username}`}>
        <button>
          <img src='./files/profileicon.png' width={50} height={50} alt="Profile Icon" />
        </button>
      </Link>
       
      </div>
      
      <div>
      <button type="button" className="filtertitle" onClick={handleShowModal}>
      <img src='./files/Filtericons.png' width={50} height={50} alt="Filter Icon" />
        Filters
      </button>
     

      {/* issues with Modal when integrating filter feature */}
      {/* <div className='background' style={{ textAlign: 'center' }}>
        <div className="profileicon">
          <Link to="/ProfilePage">
            <button>
              <img src='./files/profileicon.png' width={50} height={50} alt="Profile Icon" />
            </button>
          </Link>
        </div>

        <div>
          <button type="button" className="filtertitle" onClick={handleShowFilterModal}>
            <img src='./files/Filtericons.png' width={50} height={50} alt="Filter Icon" />
            Filters
          </button>

          <Modal show={showFilterModal} onHide={handleCloseFilterModal}>
            <Modal.Header closeButton>
              <Modal.Title>Filters</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>
                <input type="checkbox" value="chicken" />
                Chicken
              </label>
              <br />
              <label>
                <input type="checkbox" value="beef" />
                Beef
              </label>
              <br />
              <label>
                <input type="checkbox" value="fish" />
                Fish
              </label>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseFilterModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCloseFilterModal}>
                Apply Filters
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div> */}

      <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
            omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
            ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
            doloribus. Odit, aut.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
   <div className="wrapper">
    {/* <h1 className = 'maintitle'> <center><b>Tinda Swipe </b></center></h1> */}

      <center>
      <div className='recipeContainer'>
        {currentIndex >= 0 && recipes.length > currentIndex &&  recipes.length > 0 && (
          <TinderCard ref={childRefs[currentIndex]} className='swipe' key={recipes[currentIndex].recipe.label} onSwipe={(dir) => swiped(dir, recipes[currentIndex].recipe, currentIndex)} onCardLeftScreen={() => outOfFrame(recipes[currentIndex].recipe.label, currentIndex)}>
            <Card style={{width: "18 rem"}}>
              <Card.Header>{recipes[currentIndex].recipe.label}</Card.Header>
              
              {recipes[currentIndex].recipe.image && (
                <Card.Img variant="top" src={recipes[currentIndex].recipe.image} width={300} height={300} alt={recipes[currentIndex].recipe.label} />
               
              )}
              <div width={600}>
                
              
              <Button size="lg" className='swipeleftbutton' onClick={() => swipe('left')}>
              <img src='./files/x.png' width={65} height={60} alt="X Icon" />
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button size="lg" className='swiperightbutton' onClick={() => swipe('right')}> 
              <img src='./files/heart.png' width={60} height={60} alt="Heart Icon" />
              </Button>
              </div>
            </Card>
            <button type="button" className="btn btn-success w-100 rounded-0" onClick={handleShowModal}>
            See Recipe
            </button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header className="modal-bg" closeButton>
            <Modal.Title>{recipes[currentIndex].recipe.label}</Modal.Title>
          </Modal.Header>
          <Modal.Body  className="modal-bg">
          <div style={{ textAlign: "center" }}>
          <img variant="top" textAlign="center" src={recipes[currentIndex].recipe.image} width={300} height={300} alt={recipes[currentIndex].recipe.label} />
          </div>
          <div style={{ marginTop: "20px" }}>
           <h4>Ingredients:</h4>
          {recipes[currentIndex].recipe.ingredients.map(ingredient => (
                    <li> {ingredient.text}</li>
                ))}
          </div>
          <div style={{ marginTop: "20px" }}>
          <h4>Recipe Link:</h4>
          <a href={recipes[currentIndex].recipe.url} target="_blank" rel="noopener noreferrer">
          {  recipes[currentIndex].recipe.url}
          </a>

          </div>
          <div className="comment-section">
          
          <h2>Comments </h2>

                <ul>
                  {comments && comments.map((comment,index) => (
                    <div key={comment.id} className="comment">
                    <div className="comment-header">
                      <img src={"./files/profile.png"} width={20} height={20} alt="Avatar" />
                      <span className="username">{comment.username}</span>
                      <span className="timestamp">{comment.timestamp}</span>
                      </div> 
                      <div className="comment-content">{comment.content}</div>
                      {comment.imageData && (

                        <img src={comment.imageData} width={250} height={200} alt="Uploaded Image" />
                      )}
                      {/* If imageData is an object with a URL property */}
                      {comment.imageData && typeof comment.imageData === 'object' && comment.imageData.url && (
                        <img src={comment.imageData.url} width={250} height={200} alt="Uploaded Image" />
                      )}
                      
                     
                                  
                   
                    
                      <div className="comment-actions">
                      {/* Add reply, like, and delete buttons */}

          <button
            onClick={() => handleLikeClick(index)}
            className={likedComments[index] ? "like-button liked" : "like-button"}
          >
            Like
          </button>
                      <button className="comment-btn" onClick={() => handleDeleteComment(comment.content)}>Delete</button>
                    </div>
                  </div>
                  ))}
                </ul>

            <form onSubmit={(event) => handleCommentSubmit(event, recipes[currentIndex].recipe.label)}>

                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Add a new comment"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e.target.files)}
                  />

                  <button type="submit" className="button-bg">Add Comment</button>
                </form>

        </div>
            
           
             
            
            
          </Modal.Body>
          <Modal.Footer className="modal-bg">
            <Button variant="secondary" onClick={handleCloseModal} className="button-bg">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
          </TinderCard>
        )}
       
      
      </div>
      </center>
      </div>
      

      
      {previousDirection ? <h2 className='infoText'>You swiped {previousDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
}



export default MainPage;

// Nandika's filter integration not working-- 
//this is code from another branch that I was having issues with getting the modal to work with 
// const App = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [filterOptions, setFilterOptions] = useState(false); // State to toggle filter options
//   const [filter, setFilter] = useState([]); // Change state to an array for multiple selections
//   const [query, setQuery] = useState("chicken");

//   useEffect(() => {
//     getRecipes();
//   }, [query]);

//   const getRecipes = async () => {
//     const response = await axios.get(`http://localhost:5000/recipes/${query}`);
//     setRecipes(response.data);
//   };

//   const handleFilterOptionClick = (option) => {
//     const newFilter = filter.includes(option)
//       ? filter.filter((item) => item !== option) // Remove option if already selected
//       : [...filter, option]; // Add option if not already selected
//     setFilter(newFilter);
//   };

//   const handleFilterApply = () => {
//     const combinedQuery = filter.join(",");
//     setQuery(combinedQuery);
//     setFilterOptions(false); // Hide filter options after applying filter
//   };

//   return (
//     <div className="App">
//       <div className="filter-container">
//         <button className="filter-button" onClick={() => setFilterOptions(!filterOptions)}>
//           Filters
//         </button>
//         {filterOptions && (
//           <div className="filter-options">
//             <div className="filter-group">
//               <p className="filter-group-label">Dietary Restrictions:</p>
//               <div className="filter-checkboxes">
//                 <label>
//                   <input
//                     type="checkbox"
//                     value="vegan"
//                     checked={filter.includes("vegan")}
//                     onChange={() => handleFilterOptionClick("vegan")}
//                   />
//                   Vegan
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value="vegetarian"
//                     checked={filter.includes("vegetarian")}
//                     onChange={() => handleFilterOptionClick("vegetarian")}
//                   />
//                   Vegetarian
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value="pescetarian"
//                     checked={filter.includes("pescetarian")}
//                     onChange={() => handleFilterOptionClick("pescetarian")}
//                   />
//                   Pescetarian
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value="gluten-free"
//                     checked={filter.includes("gluten-free")}
//                     onChange={() => handleFilterOptionClick("gluten-free")}
//                   />
//                   Gluten Free
//                 </label>
//               </div>
//             </div>
//             <div className="filter-group">
//               <p className="filter-group-label">Cuisine Types:</p>
//               <div className="filter-checkboxes">
//                 <label>
//                   <input
//                     type="checkbox"
//                     value="asian"
//                     checked={filter.includes("asian")}
//                     onChange={() => handleFilterOptionClick("asian")}
//                   />
//                   Asian
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value="italian"
//                     checked={filter.includes("italian")}
//                     onChange={() => handleFilterOptionClick("italian")}
//                   />
//                   Italian
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value="middle-eastern"
//                     checked={filter.includes("middle-eastern")}
//                     onChange={() => handleFilterOptionClick("middle-eastern")}
//                   />
//                   Middle Eastern
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value="american"
//                     checked={filter.includes("american")}
//                     onChange={() => handleFilterOptionClick("american")}
//                   />
//                   American
//                 </label>
//               </div>
//             </div>
//             <button className="apply-filter-button" onClick={handleFilterApply}>
//               Apply Filter
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="recipes">
//         {recipes.map((recipe) => (
//           <Recipe
//             key={recipe.recipe.label}
//             title={recipe.recipe.label}
//             image={recipe.recipe.image}
//             ingredients={recipe.recipe.ingredients}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };