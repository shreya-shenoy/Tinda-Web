import React, {useState, useRef, useMemo, useEffect} from "react";
import TinderCard from "react-tinder-card";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import "./MainPage.css";

// Reference: https://www.npmjs.com/package/react-tinder-card - Code Demo and Examples

const db = [
  {
    name: 'Chicken parmesan',
    image: './files/Chickenparmesan.jpeg'
  },
  {
    name: 'Lasagna',
    image: './files/Lasagna.jpg'
  },
  {
    name: 'Fish Tacos',
    image: './files/Fishtacos.jpg'
  },
  {
    name: 'Lava Cake',
    image: './files/Lavacake.jpeg'

  },
  {
    name: 'Broccoli Cheddar Soup',
    image: './files/BroccoliSoup.jpeg'

  }
]



function MainPage() {
  const recipes = db
  const[previousDirection, setPreviousDirection] = useState()
  const[currentIndex, setCurrentIndex] = useState(db.length - 1)
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () => Array(db.length).fill(0).map((i) => React.createRef()), []
  )
    // create an Array of db length with 0s
    // using memoization to improve performance and only recalculate when necessary

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canSwipe = currentIndex >= 0
  // can only swipe if index >= 0

  const swiped = (direction, recipeDelete, index) => {
    console.log("Deleting: " + recipeDelete)
    setPreviousDirection(direction)
    updateCurrentIndex(index - 1)
  }
  const canGoBack = currentIndex < db.length - 1
  const outOfFrame = (recipe, index) => {
    console.log(recipe + ' left screen')
  }
  const swipe = async (dir) => {
    if(canSwipe && currentIndex < db.length) // index is within valid indices of db
    {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card in this direction
    }
  }
  const goBack = async () => {
    if(!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return(
    <div className = 'background' style={{ textAlign:'center', backgroundColor: 'rgb(230, 217, 175)'}}>
      <h1 className = 'maintitle'> Tinda Swipe </h1>
      <div className='recipeContainer'>
        {currentIndex >= 0 && (
          <TinderCard ref={childRefs[currentIndex]} className='swipe' key={recipes[currentIndex].name} onSwipe={(dir) => swiped(dir, recipes[currentIndex], currentIndex)} onCardLeftScreen={() => outOfFrame(recipes[currentIndex].name, currentIndex)}>
            <Card style={{width: "18 rem"}}>
              <Card.Header>{recipes[currentIndex].name}</Card.Header>
              {recipes[currentIndex].image && (
                <Card.Img variant="top" src={recipes[currentIndex].image} width={300} height={300} alt={recipes[currentIndex].name} />
               
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
