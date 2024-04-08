import React from 'react';


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