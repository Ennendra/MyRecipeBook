//express and mongoose libraries
const express = require('express');
const mongoose = require('mongoose');
//The recipe schema model
const Recipe = require('../../models/recipe');

//Defining the server backend
const app = express();
//determine the port the server-backend will listen through
const PORT = process.env.PORT || 5000;

export async function serverInit() {
//establish a connection to the database
    mongoose.connect('mongodb+srv://GeneralUser:qp6bWVUXYqJSTK26@myrecipebookdb.bmiie.mongodb.net/MyRecipeBook?retryWrites=true&w=majority&appName=MyRecipeBookDB', 
        {useNewUrlParser: true, useUnifiedTopology: true}
    ).then(() => {
        console.log('Successful connection');
    }).catch(() => {
        console.log('Connection Failed!');
    });
}


//Set up the api routes to interact with the database (ie, when the front-end sends requests)
app.get("/api/recipes", searchRecipes);
app.post("/api/recipes", createRecipe);
app.put("/api/recipes", updateRecipe);
app.delete("/api/recipes", deleteRecipe);

//listen on the server for requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Finding all recipes
const searchRecipes = async (req, res, next) => {
    let recipes;
    try {
        recipes = await Recipe.find().exec();
    } catch(error) {
        console.log('Error finding recipes:' + error);
        return next(error);
    }
    res.json({recipes: recipes.toObject({getters: true}) });
};
//Finding a specific recipe by ID (for ViewRecipe or updating and deleting recipe)
const searchRecipeById = async (req, res, next) => {
    const recipeId = req.params.id;

    let recipes;
    try {
        recipes = await Recipe.findById(recipeId).exec();
    } catch(error) {
        console.log('Error finding recipe by id:' + error);
        return next(error);
    }
    
    res.json({recipes: recipes.toObject({getters: true}) });
};
//Searching recipes by name (for the searchbar)
const searchRecipesByName = async (req, res, next) => {
    const recipeName = req.params.recipeName;

    let recipes;
    try {
        recipes = await Recipe.find({recipeName: recipeName}).exec();
    } catch(error) {
        console.log('Error finding recipe by id:' + error);
        return next(error);
    }
    
    res.json({recipes: recipes.map(recipe => recipe.toObject( {getters:true} )) });
};
//Creating a new recipe
const createRecipe = async (req, res, next) => {
    //Assemble the recipe inputs into the mongoose schema model
    const createdRecipe = new Recipe( { 
        recipeName: req.body.recipeName,
        recipeDescription: req.body.recipeDescription,
        imageSrc: req.body.imageSrc,
        prepDurationMinutes : req.body.prepDurationMinutes,
        cookDurationMinutes : req.body.cookDurationMinutes,
        recipeServings: req.body.recipeServings,
        ingredients: req.body.ingredients,
        cookingSteps: req.body.cookingSteps
    });

    //Save the model into the database
    let result;
    try {
        result = await createdRecipe.save();
    }
    catch (error) {
        console.log('Error creating recipe:' + error);
        return next(error);
    }
    
    console.log(typeof createdRecipe.id);
    res.json(result);
};
//Updating an exiting recipe
const updateRecipe = async (req, res, next) => {

    //define which recipe we are updating by the id parameter
    const recipeId = req.params.id;
    //Define an object using the new form information
    const {
        recipeName,
        recipeDescription,
        imageSrc,
        prepDurationMinutes,
        cookDurationMinutes,
        recipeServings,
        ingredients,
        cookingSteps
    } = req.body;
    

    //Define the recipe schema model by the recipe ID
    let recipe;
    try {
        recipe = await Recipe.findById(recipeId);
    }
    catch (error) {
        console.log('Error defining recipe to update:' + error);
        return next(error);
    }

    //update the information on the retrieved schema model
    recipe.recipeName = recipeName;
    recipe.recipeDescription = recipeDescription;
    recipe.imageSrc = imageSrc;
    recipe.prepDurationMinutes = prepDurationMinutes;
    recipe.cookDurationMinutes = cookDurationMinutes;
    recipe.recipeServings = recipeServings;
    recipe.ingredients = ingredients;
    recipe.cookingSteps = cookingSteps;

    //save the schema model to the database
    try {
        await recipe.save();
    } catch (error) {
        console.log('Error attempting to save updated recipe:' + error);
        return next(error);
    }

    res.status(200).json({recipe: recipe.toObject({getters: true}) });
};
//Deleting a recipe
const deleteRecipe = async (req, res, next) => {
    //define which recipe we are removing by the recipe ID
    const recipeId = req.params.id;

    //Define the recipe schema model by the recipe ID
    let recipe;
    try {
        recipe = await Recipe.findById(recipeId);
    }
    catch (error) {
        console.log('Error defining recipe to delete:' + error);
        return next(error);
    }
    
    //Deleting the schema model from the database via filter
    try {
        await recipe.remove();
    } catch (error) {
        console.log('Error deleting recipe:' + error);
        return next(error);
    }

    res.status(200).json({ message: 'Recipe deleted.' });
};