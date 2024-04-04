import React from 'react';


const Recipe = ({title, calories, image, ingredients}) => {
    return(
        <div>
            <h1> {title}</h1>
            <ol>
                {ingredients.map(ingredient => (
                    <li> {ingredient.text}</li>
                ))}
            
            </ol>
            <p> Calories: {calories.toFixed()}</p>
            <img className={image} src={image} atl=""/>

        </div>
    )
}
export default Recipe;