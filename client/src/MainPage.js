import React, {useState, useRef, useEffect} from "react";
import TinderCard from "react-tinder-card";

const db = [
  {
    name: 'Chicken parmesan'
  },
  {
    name: 'Lasagna'
  },
  {
    name: 'Fish Tacos'
  },
  {
    name: 'Lava Cake'

  },
  {
    name: 'Broccoli Cheddar Soup'

  }
]



function MainPage() {
  const[currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const recipeRefs = useRef(db.map(() => React.createRef()));

  const swiped = (direction, recipeDelete) => {
    console.log("Deleting: ", recipeDelete);
    setCurrentRecipeIndex(prevIndex => prevIndex + 1);
  };
  const outOfFrame = (recipeName) => {
    console.log(recipeName + " is out of the screen")
  };
  const swipe = (direction) => {
    if(recipeRefs.current[currentRecipeIndex])
      recipeRefs.current[currentRecipeIndex].current.swipe(direction);
  };
  
  return(
    <div>
  <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {db.slice(currentRecipeIndex, currentRecipeIndex + 1).map((recipe,index) => (
          <TinderCard
            ref = {recipeRefs.current[index]}
            className='swipe'
            key={recipe.name}
            preventSwipe = {['up', 'down']}
            onSwipe={(dir) => swiped(dir, recipe.name)}
            onCardLeftScreen={() => outOfFrame(recipe.name)}
          >
            <div>
              <h3>{recipe.name}</h3>
            </div>
            <div>
              <button onClick={() => swipe('left')}>Swipe Left</button>
              <button onClick={() => swipe('right')}>Swipe Right</button>
            </div>
          </TinderCard>
        ))}
      </div>
      </div>
  );
}

export default MainPage;
