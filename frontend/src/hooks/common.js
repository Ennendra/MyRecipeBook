import { useEffect, useState } from 'react';

//Selects <amountOfRecipe> recipes from <recipeList> and returns the subset of recipes as an array
export function chooseRandomRecipes(givenRecipeList, amountOfRecipes) {
  if (!Array.isArray(givenRecipeList)) {
    return;
  }
  const shuffledRecipes = [...givenRecipeList].sort(() => 0.5 - Math.random());
  return shuffledRecipes.slice(0, amountOfRecipes);
}

export const useRecipes = searchPattern => {
  //A usestate that will hold all the recipe JSON data
  //Usestate initially separator to null to ensure other functions do not try to use the data until after it's successfully fetched
  const [recipeList, setRecipeList] = useState(null);

  //Obtain the data from the JSON file and set it to recipeList as an array of all recipes
  useEffect(() => {
    fetch('/data/recipes.json')
      .then(response => response.json())
      .then(recipeList => {
        // Local recipes storing until backend is not implemented
        const storageLocalRecipes = localStorage.getItem('localRecipes');
        const localRecipes = storageLocalRecipes ? JSON.parse(storageLocalRecipes) : [];
        setRecipeList([...recipeList.Recipes, ...localRecipes]);
      })
      .catch(error => {
        console.error(`Error in fetch: ${error.message}`);
      });
  }, []);

  // if searchPattern = undefined return recipeList,
  // else make search (filter) by recipeName in lower case.
  return !searchPattern
    ? recipeList
    : recipeList?.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(searchPattern.toLowerCase())
      );
};

/**
 * Hook which returns recipe by id.
 * @param {string} recipeId
 * @returns recipe, if found or undefined.
 */
export const useRecipe = recipeId => {
  const recipeList = useRecipes();
  return recipeList?.find(recipe => recipe.recipeIDNumber == recipeId);
};
