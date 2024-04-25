import React, {useState, useEffect} from "react";
import Recipe from "./Recipe";
import './App.css';


const App = () => {

    //our API credentials!!
    const APP_ID = '8bbd57b4';
    const APP_KEY = '6424d94c5f215da7af69015836e315e8';

    // states variables for recipes, search query, and the search term 
    // also from when we had an initial search bar
    const [recipe, setRecipes] = useState([])
    const[search, setSearch] = useState("");
    const[query, setQuery] = useState('chicken');

    // fetches recipes from API when query changes
    useEffect( () =>{
        getRecipes()
    }, [query])

    // fetches recipes from API
    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        const data = await response.json()
        setRecipes(data.hits)
    }

    //used to update search term as a user is typing
    const updateSearch = (e) => {
        setSearch(e.target.value)
    }


    return(

        <div className="App">
            {/* search bar */}
            <form className="search-form">
                <input className="search-bar" type="text"> </input>
                <button className="search-button" type="submit"> Search </button>

            </form>

            {/* displays recipes */}
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

export default App;
