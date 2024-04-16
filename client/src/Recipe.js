import React from 'react';


const Recipe = ({title, calories, image, ingredients, url, id}) => {
    return(
        <div>
            <h1> {title}</h1>
            <ol>
                {ingredients.map(ingredient => (
                    <li> {ingredient.text}</li>
                ))}
            
            </ol>
            <p> Calories: {calories.toFixed()}</p>
            <p> Url: {url} </p>
            <p> ID: {id}</p>
            <img className={image} src={image} atl=""/>

        </div>
    )
}
export default Recipe;