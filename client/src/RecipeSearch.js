import React, {useState, useEffect} from "react";
import Recipe from "./Recipe";



function RecipeSearch()  {

    const APP_ID = '8bbd57b4';
    const APP_KEY = '6424d94c5f215da7af69015836e315e8';

    const [recipes, setRecipes] = useState([])
    const[search, setSearch] = useState("");
    const[query, setQuery] = useState('chicken');
   
    useEffect( () =>{
        getRecipes()
    }, [])

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        const data = await response.json()
        setRecipes(data.hits)
    }

    

    
    const updateSearch = (e) => {
        setSearch(e.target.value)
    }
    const getSearch = (e) => {
        e.preventDefault()
        setQuery(search)
        setSearch('')
    }


    return(

        <div className="App">
            <h1> Hello world </h1>
            <form onSubmit={getSearch}className="search-form">
                <input className="search-bar" type="text" value={search} onChange={updateSearch}></input>
                <button className="search-button" type="submit"> Search </button>

            </form>
            <div className="recipes">
                {recipes.map(recipe => (
                    <Recipe
                    key={recipe.recipe.label}
                    title={recipe.recipe.label}
                    calories={recipe.recipe.calories}
                    image={recipe.recipe.image}
                    ingredients={recipe.recipe.ingredients} 
                    />
                ))}
            </div>
        </div>
    )
}

export default RecipeSearch;