import React from "react";
import "./App.css";
import { RecipeCards } from "./components/RecipeCards";
import { SearchBar } from "./components/SearchBar";
import { useState, useEffect } from "react";

function App() {

  //A usestate that will hold all the recipe JSON data
  //Usestate initially set to null to ensure other functions do not try to use the data until after it's successfully fetched
  const [recipeList, setRecipeList] = useState(null);

  //Obtain the data from the JSON file and set it to recipeList as an array of all recipes
  useEffect(() => {
    fetch('./data/recipes.json')
      .then(response => response.json())
      .then (recipeList => {
        setRecipeList(recipeList.Recipes);
      })
      .catch(error => {
        console.error(`Error in fetch: ${error.message}`);
      });
  }, []);

  //Selects <amountOfRecipe> recipes from <recipeList> and returns the subset of recipes as an array
  function ChooseRandomRecipes(givenRecipeList, amountOfRecipes){
    const shuffledRecipes = [...givenRecipeList].sort(() => 0.5 - Math.random());
    return shuffledRecipes.slice(0, amountOfRecipes);
  }


  return (
    <div className="App">
      {" "}
      {}
      <div>
        <h1 className="h1"> My recipe book</h1>
        <SearchBar />
      </div>
      <h1 className="h1" />

      {recipeList ? (
        //Display recipe cards after the recipes have been successfully fetched from the JSON files
        <RecipeCards recipes={ChooseRandomRecipes(recipeList, 3)} />
      ) : ( 
        //Show a loading tag until data is fetched
        <p>Fetching recipe data...</p>
      )}
      
    </div>
  );
}

export default App;
