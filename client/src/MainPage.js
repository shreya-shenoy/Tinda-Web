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
  const APP_ID = '8bbd57b4';
  const APP_KEY = '6424d94c5f215da7af69015836e315e8';

  const [recipes, setRecipes] = useState([])
  const [childRefs, setChildRefs] = useState([]);
  const[search, setSearch] = useState("");
  const[query, setQuery] = useState('pasta');
  //const childRefs = useRef([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [imageData, setImageData] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  //const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentData] = useState([]);
  const [recipeLength, setRecipeLength] = useState(0);
  const location = useLocation();
  const username = new URLSearchParams(location.search).get("username");
  console.log("USERNAME", username);
  
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const[currentIndex, setCurrentIndex] = useState(recipes.length > 0 ? recipes.length - 1 : 0);
  console.log(recipes.length, "recipes", recipes)
  const currentIndexRef = useRef(currentIndex);


  const [likedComments, setLikedComments] = useState(() => {
    const storedLikedComments = JSON.parse(localStorage.getItem("likedComments"));
    return storedLikedComments || {};
  });

  useEffect(() => {
    localStorage.setItem("likedComments", JSON.stringify(likedComments));
  }, [likedComments]);

  const handleLikeClick = (commentId) => {
    setLikedComments(prevLikedComments => ({
      ...prevLikedComments,
      [commentId]: !prevLikedComments[commentId]
    }));
  };
  


const [image,setImage] = useState("");

  function covertToBase64(e){
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=()=>{

      console.log(reader.result);
      setImage(reader.result);
    };

    reader.onerror = error =>{
      console.log("Error: ", error);
    };
  }
 
  function uploadImage(){
    fetch("http://localhost:3001/upload-image",{
      method: "POST",
      crossDOmain: true,
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        base64:image
      })
    }).then((res)=> res.json()).then((data)=> console.log(data))
  }
  /*const handleEmojiClick = (emoji) => {
    const emojiString = emoji.unified;
    setComment(comment + emojiString); // Update the comment state with the selected emoji'
    console.log(emojiString);
    setIsPickerOpen(false); // Close the emoji picker after selecting an emoji
  };*/
  
  console.log("RECIPES LENGTH", recipes.length);
  
  

  const togglePicker = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setIsPickerOpen(!isPickerOpen); // Toggle the state to open/close the picker
  };
  
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
  
  
  

  // const handleDeleteComment = async (commentId) => {
  //   try {
      
  //     commentId = commentId.substring(0, commentId.length - 1)+"+00:00";
  //     const response = await fetch(`http://localhost:3001/comments?createdAt=${commentId}`, {
  //       method: 'DELETE'
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to delete comment');
  //     }
  //     // Filter out the deleted comment from the comments state
  //     const updatedComments = comments.filter(comment => comment.createdAt == commentId);
  //   setComments(updatedComments);
  // } catch (error) {
  //   console.error('Error deleting comment:', error);
  // }
  // };




  useEffect(() => {
    setChildRefs(Array(recipes.length).fill(null).map(() => React.createRef()));
  }, [recipes]);
  
  useEffect( () =>{ 
  const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const data = await response.json()
      console.log(data);
      setRecipes(data.hits)
      //setCurrentIndex(data.hits.length - 1);
      setRecipeLength(data.hits.length - 1);
      //childRefs.current = data.hits.map(() => React.createRef());
      //console.log("CHILD REFS", childRefs.current);
      };
 


  getRecipes();
}, []);
  
/*const childRefs = useMemo(
  () => Array(recipeLength).fill(0).map((i) => React.createRef()), []
   
)*/
console.log(childRefs);

  
  console.log("currentIndex", currentIndex)

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setShowModal(true);
    if (currentIndex >= 0 && recipes.length > currentIndex && recipes.length > 0) {
      const recipeId = recipes[currentIndex].recipe.label; // Adjust this if the recipe ID is stored differently
      getComments(recipeId); // Fetch comments for the currently selected recipe
    }
  };


  const handleCloseImageModal = () => setShowImageModal(false);
  const handleShowImageModal = () => {
    setShowImageModal(true);
  };
  
  const[previousDirection, setPreviousDirection] = useState();
  

  /*const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = () => {
    const commentWithEmoji = comment + (chosenEmoji ? chosenEmoji.unified : ''); 
    console.log("Comment submitted:", commentWithEmoji);
    setComments([...comments, commentWithEmoji]); 
    setComment(""); 
    setChosenEmoji(null); 
  };*/
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
  /*const getComments = async (recipeId) => {
    try{
      const response = await fetch(`http://localhost:3001/comments?recipeId=${recipeId}`);
      if(!response.ok){
        throw new Error('Failed to get comments');
      }
      const data = await response.json();
      setComments(data);
    }
    catch(error){
      console.error('Error with comments: ', error);
      setComments([]);
    }

  };*/
  const getComments = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:3001/comments?recipeId=${recipeId}`);
      if (!response.ok) {
        throw new Error('Failed to get comments');
      }
      const data = await response.json();
      // Assuming the image paths are stored under the key 'imagePath' in your comment data
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
  
  
  const handleCommentSubmit = async (event, recipeId) => {
    event.preventDefault();
    try {
      /*const commentData = new FormData();
      commentData.append("content", newCommentText);
      commentData.append("username", username);
      commentData.append("recipeId", recipeId);
      commentData.append("image", imageData);*/
      const response = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
       body: JSON.stringify({ 
          content: newCommentText,
          username: username,
          recipeId: recipeId,
          // imageData: newImageData
        })
        //body: commentData,
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setNewCommentText(''); // Clear input field after submission
      setImageData(null);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  
  const handleImageUpload = (files) => {
    /*const file = files[0]; 
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader.result);
    reader.onloadend = () => {
      if(reader.result){
        setImageData(reader.result);
      }
     
    };*/
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageData(event.target.result);
    };

    reader.onerror = (error) => {
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
      
      <Link to="/ProfilePage">
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
            &nbsp;
            <button type="button" className="btn btn-success w-100 rounded-0" onClick={handleShowModal}>
            See Recipe
            </button>
            &nbsp;
            <button type="button" className="btn btn-success w-100 rounded-0" onClick={handleShowImageModal}>
            See Recipe Images
            </button>

                

            <Modal show={showImageModal} onHide={handleCloseImageModal}>
          <Modal.Header closeButton>
            <Modal.Title>{recipes[currentIndex].recipe.label} Images</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="auth-wrapper">
              <div className="auth-inner" style={{width: "auto"}}>
                Upload your Recipe!<br/>
                <input accept="image/*"
                type="file"
                onChange={covertToBase64}

                />

                {image==""||image==null?"": <img width = {100} height = {100} src={image}/>}
                <button onClick={uploadImage}>Upload</button>
                {/* <button>Upload</button> */}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseImageModal}>
              Close
            </Button>
          </Modal.Footer>
          </Modal>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{recipes[currentIndex].recipe.label}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          
            <div>
          
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
                      <button className="like-button">Reply</button>
                      {/* <p>{comment.text}</p> */}
          <button
            onClick={() => handleLikeClick(index)}
            className={likedComments[index] ? "like-button liked" : "like-button"}
          >
            Like
          </button>
                      <button  className="like-button" onClick={() => handleDeleteComment(comment.content)}>Delete</button>
                    </div>
                  </div>
                  ))}
                </ul>
             

        </div>
            
           
             
            </div>
            <form onSubmit={(event) => handleCommentSubmit(event, recipes[currentIndex].recipe.label)}>
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Add a new comment"
                  />
                  {/* <input
                    type="file"
                    onChange={(e) => handleImageUpload(e.target.files)}
                  /> */}
                  <button type="submit">Add Comment</button>
                </form>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
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