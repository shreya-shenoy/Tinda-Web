import React, {useState, useRef, useMemo, useEffect} from "react";
import TinderCard from "react-tinder-card";
import "./MainPage.css";

// Reference: https://www.npmjs.com/package/react-tinder-card - Code Demo and Examples

const db = [
  {
    name: 'Chicken parmesan',
    image: 'files/Chickenparmesan.jpeg'
  },
  {
    name: 'Lasagna',
    image: 'files/Lasagna.jpg'
  },
  {
    name: 'Fish Tacos',
    image: 'files/Fishtacos.jpg'
  },
  {
    name: 'Lava Cake',
    image: 'files/Lavacake.jpeg'

  },
  {
    name: 'Broccoli Cheddar Soup',
    image: 'files/BroccoliSoup.jpeg'

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
    <div className = 'background'>
      <h1 className = 'maintitle'> Tinda Swipe </h1>
      <div className='recipeContainer'>
        {currentIndex >= 0 && (
          <TinderCard ref={childRefs[currentIndex]} className='swipe' key={recipes[currentIndex].name} onSwipe={(dir) => swiped(dir, recipes[currentIndex], currentIndex)} onCardLeftScreen={() => outOfFrame(recipes[currentIndex].name, currentIndex)}>
            <div className='card'>
              <h3>{recipes[currentIndex].name}</h3>
              {recipes[currentIndex].image && (
                <img src={recipes[currentIndex].image} alt={recipes[currentIndex].name} />
              )}
            </div>
          </TinderCard>
        )}
      </div>
      <div className = 'buttons'>
        <button onClick={() => swipe('left')}>Swipe left!</button>
        <button onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {previousDirection ? <h2 className='infoText'>You swiped {previousDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
}

export default MainPage;
