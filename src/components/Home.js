import React, { useEffect, useState } from "react";
import { RecipeCards } from "./RecipeCards";
import { SearchBar } from "./SearchBar";
import "./Styles.css";

export const Home = () => {
  //A usestate that will hold all the recipe JSON data
  //Usestate initially separator to null to ensure other functions do not try to use the data until after it's successfully fetched
  const [recipeList, setRecipeList] = useState(null);

  //Obtain the data from the JSON file and set it to recipeList as an array of all recipes
  useEffect(() => {
    fetch("./data/recipes.json")
      .then((response) => response.json())
      .then((recipeList) => {
        setRecipeList(recipeList.Recipes);
      })
      .catch((error) => {
        console.error(`Error in fetch: ${error.message}`);
      });
  }, []);

  //Selects <amountOfRecipe> recipes from <recipeList> and returns the subset of recipes as an array
  function ChooseRandomRecipes(givenRecipeList, amountOfRecipes) {
    const shuffledRecipes = [...givenRecipeList].sort(
      () => 0.5 - Math.random()
    );
    return shuffledRecipes.slice(0, amountOfRecipes);
  }
  return (
    <div>
      <h1 className="h1"> MyRecipeBook</h1>
      <SearchBar />
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
};
