const express = require('express');

const recipeController = require('../controllers/recipe-controller');

const fileUpload = require('../middleware/file-upload');

const router = express.Router();

/*
    Routes to remember: These are routes that the frontend will navigate to when interacting with the app (ie. everything after the domain e.g. 'localhost:3000/<route>')
        /home - view all recipes. Frontend can then sort them and show 3
        /home/:searchParam - Searchbar, find all recipes whose name contains what is searched
        /viewRecipe/:recipeID - search the recipe whose ID matches
        /addNewRecipe - POST the new recipe after the form is validated
        /editRecipe/:recipeID - find the recipe that matches the ID and PATCH it (or UPDATE), using the formatted form
        /deleteRecipe/:recipeID - find the recipe that matches the ID and DELETE it
*/

//Home - find all recipes (Frontend will then show 3 random recipes)
router.get(`/home`, recipeController.getRandomRecipes);

//Home/:recipeSearch - Find all recipes containing the phrase in the recipe search
router.get(`/home/:recipeSearch`, recipeController.getRecipeByName);

//viewRecipe - show the recipe matching the given param ID
router.get(`/viewRecipe/:recipeID`, recipeController.getRecipeById);

//addNewRecipe - Add a new recipe 
//Since this form is being sent as formdata (in order to allow image uploads), we require that extra fileupload argument
router.post(`/addNewRecipe`, fileUpload.single('imageFile'), recipeController.addNewRecipe);

//editRecipe - finding the recipe to edit (will be used for auto-fill info)
router.get(`/editRecipe/:recipeID`, recipeController.getRecipeById)
//editRecipe - Update recipe matching a given param ID
router.patch(`/editRecipe/:recipeID`, recipeController.updateRecipe);

//deleteRecipe - delete recipe matching a given param ID
router.delete(`/deleteRecipe/:recipeID`, recipeController.deleteRecipe)


module.exports = router;