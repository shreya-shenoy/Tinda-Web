import React from 'react';

// displaying recipe with its title, ingredients and other details
const Recipe = ({title, calories, image, ingredients}) => {
    return(
        <div className={style.recipe}>
            <h1> {title}</h1>
            <ol>
                {ingredients.map(ingredient => (
                    <li> {ingredient.text}</li>
                ))}
            
            </ol>
            <p> Calories: {calories.toFixed()}</p>
            <img className={style.image} src={image} atl=""/>

        </div>
    )
}
export default Recipe;