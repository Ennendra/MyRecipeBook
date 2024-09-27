import React from "react";
import "./App.css";
//import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RecipeCards } from "./components/RecipeCards";
import { SearchBar } from "./components/SearchBar";
import { useState, useEffect } from "react";
import { ViewRecipe } from "./components/ViewRecipe"
//import * as conversionUtility from "./components/IngredientConversionUtilities"

function App() {

  //A usestate that will hold all the recipe JSON data
  //Usestate initially set to null to ensure other functions do not try to use the data until after it's successfully fetched
  const [recipeList, setRecipeList] = useState(null);

  //Called on startup and whenever the JSON file is modified (ie. create, edit and delete recipe)
  //Obtains the data from the JSON file and set it to recipeList as an array of all recipes
  function RefreshRecipeList(){
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
  }

  //Call the above function here to initialise the list on startup
  RefreshRecipeList();

  //Selects <amountOfRecipe> recipes from <recipeList> and returns the subset of recipes as an array
  function ChooseRandomRecipes(givenRecipeList, amountOfRecipes){
    const shuffledRecipes = [...givenRecipeList].sort(() => 0.5 - Math.random());
    return shuffledRecipes.slice(0, amountOfRecipes);
  }


  return (
    <div className="App">
      {" "}
      
      <div>
        <h1 className="h1"> My recipe book</h1>
        <SearchBar />
      </div>
      <h1 className="h1" />
      
      {recipeList ? (
        //Display recipe cards after the recipes have been successfully fetched from the JSON files
        <div>
          
          <RecipeCards recipes={ChooseRandomRecipes(recipeList, 3)} />

          <ViewRecipe recipeList={recipeList} recipeID={1} />
        </div>
        
      ) : ( 
        //Show a loading tag until data is fetched
        <p>Fetching recipe data...</p>
      )}
      <hr />    
      
    </div>
  );
}

export default App;
