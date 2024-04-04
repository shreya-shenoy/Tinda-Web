import React, {useState, useRef, useMemo, useEffect} from "react";
import TinderCard from "react-tinder-card";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import "./MainPage.css";
import Recipe from "./Recipe";
import Dropdown from 'react-bootstrap/Dropdown';
import Popup from 'reactjs-popup';

// Reference: https://www.npmjs.com/package/react-tinder-card - Code Demo and Examples





function MainPage() {
  const APP_ID = '8bbd57b4';
  const APP_KEY = '6424d94c5f215da7af69015836e315e8';

  const [recipes, setRecipes] = useState([])
  const[search, setSearch] = useState("");
  const[query, setQuery] = useState('chicken');
  const childRefs = useRef([]);
  

  useEffect( () =>{
    getRecipes()
  }, [])

const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    console.log(data);
    setRecipes(data.hits)
    childRefs.current = data.hits.map(() => React.createRef());
}



  const[previousDirection, setPreviousDirection] = useState();
  const[currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex)
  
  

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    //currentIndexRef.current = val
  }

  const canSwipe = currentIndex >= 0
  // can only swipe if index >= 0

  const swiped = (direction, recipeDelete, index) => {
    console.log("Deleting: " + recipeDelete)
    setPreviousDirection(direction)
    updateCurrentIndex(index + 1)
  }
  const canGoBack = currentIndex < recipes.length - 1
  const outOfFrame = (recipe, index) => {
    console.log(recipe + ' left screen')
  }
  const swipe = async (dir) => {
    if(canSwipe && currentIndex >= 0 && currentIndex < recipes.length && childRefs.current[currentIndex] && childRefs.current[currentIndex].current) // index is within valid indices of db
    {
      await childRefs.current[currentIndex].current.swipe(dir) // Swipe the card in this direction
      console.log("Swipe");
      updateCurrentIndex(dir === "left" ? currentIndex + 1 : currentIndex - 1);
    }
  }
  const goBack = async () => {
    if(!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return(
    <div className = 'background' style={{ textAlign:'center'}}>
      <h1 className = 'maintitle'> Tinda Swipe </h1>
      <div>
      <button type="button" className="filtertitle" onClick={() => setOpen(!open)}>
      <img src='./files/Filtericons.png' width={50} height={50} alt="Your Image" />
        Filters
      </button>
      <Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
          omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
          ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
          doloribus. Odit, aut.
        </div>
      </Popup>
    </div>
    
      <div className='recipeContainer'>
        {currentIndex >= 0 && recipes.length > currentIndex && (
          <TinderCard ref={childRefs[currentIndex]} className='swipe' key={recipes[currentIndex].recipe.label} onSwipe={(dir) => swiped(dir, recipes[currentIndex], currentIndex)} onCardLeftScreen={() => outOfFrame(recipes[currentIndex].recipe.label, currentIndex)}>
            <Card style={{width: "18 rem"}}>
              <Card.Header>{recipes[currentIndex].recipe.label}</Card.Header>
              {recipes[currentIndex].recipe.image && (
                <Card.Img variant="top" src={recipes[currentIndex].recipe.image} width={300} height={300} alt={recipes[currentIndex].recipe.label} />
               
              )}
              <div className="buttons" width={600}>
            
              
              <Button size="lg" className='button' onClick={() => swipe('left')}> Swipe left! </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button size="lg" className='button' onClick={() => swipe('right')}> Swipe right! </Button>
              </div>
            </Card>
          </TinderCard>
        )}
       
      </div>
      

      
      {previousDirection ? <h2 className='infoText'>You swiped {previousDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
}

export default MainPage;
