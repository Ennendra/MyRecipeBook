import React from "react";
import "./App.css";
import { RecipeCards } from "./components/RecipeCards";
import { SearchBar } from "./components/SearchBar";

function App() {

  //Acquire an array of all recipes from the recipes.json file
  let recipes = require('./data/recipes.json').Recipes;
  console.log(recipes);

  //Selects <amountOfRecipe> recipes from <recipeList> and returns the subset of recipes as an array
  function ChooseRandomRecipes(recipeList, amountOfRecipes){
    const shuffledRecipes = [...recipeList].sort(() => 0.5 - Math.random());
    return shuffledRecipes.slice(0, amountOfRecipes);
  }


  /*const oldrecipes = [
    {
      recipeIDNumber: 1,
      recipeName: "Fish soup.",
      resipeImage: "images/fishSoup.jpeg",
      cookDurationMinutes: "1 hour",
      portions: 4,
    },
    {
      recipeIDNumber: 2,
      recipeName: "Pizza Margherita.",
      resipeImage: "images/pizzaMargherita.jpg",
      cookDurationMinutes: "1.5 hours",
      portions: 3,
    },
    {
      recipeIDNumber: 3,
      recipeName: "Pasta Bolognese.",
      resipeImage: "images/pastaBolognese.jpg",
      cookDurationMinutes: "30 minutes",
      portions: 6,
    },
  ];*/

  return (
    <div className="App">
      {" "}
      {}
      <div>
        <h1 className="h1"> My recipe book</h1>
        <SearchBar />
      </div>
      <h1 className="h1" />
      <RecipeCards recipes={ChooseRandomRecipes(recipes, 3)} />
    </div>
  );
}

export default App;
