const fs = require('fs');
//Schema models and the error handler model
const HttpError = require('../models/httpError');
const Recipe = require('../models/recipe');
//The mongoose API
const mongoose = require("mongoose");

const getAllRecipes = async (req, res, next) => {
    //Define the result
    let recipes;
    //Attempt to find all recipes
    try {
        recipes = await Recipe.find({});
    } catch(error) {
        const newError = new HttpError(500,"Something went wrong obtaining the recipe list: ");
        return next(newError);
    }
    res.json({recipes: recipes.map(recipe => recipe.toObject( {getters:true} )) });
};

const getRandomRecipes = async (req, res, next) => {
    //Define the result
    let recipes;
    //Attempt to find all recipes
    try {
        recipes = await Recipe.find({});
    } catch(error) {
        const newError = new HttpError(500,"Something went wrong obtaining the recipe list: ");
        return next(newError);
    }

    const randomisedRecipes = [...recipes].sort(() => 0.5 - Math.random()).slice(0,3);

    res.json({recipes: randomisedRecipes.map(recipe => recipe.toObject( {getters:true} )) });
};

const getRecipeById = async (req, res, next) => {
    //define the ID parameter
    const recipeId = req.params.recipeID;
    //defiine the result
    let recipe;
    //attempt the search
    try {
        recipe = await Recipe.findById(recipeId);
    } catch(error) {
        const newError = new HttpError(500,"Something went wrong when searching for a recipe by ID: ");
        return next(newError);
    }
    //return a 404 error if no recipe is found
    if (!recipe) {
        const newError = new HttpError(404,"Could not find a recipe with the given ID.");
        return next(newError);
    }
    
    res.json({recipes: recipe.toObject({getters: true}) });
};

const getRecipeByName = async (req, res, next) => {
    //define the search parameter, convert the parameter into utf format
    const recipeSearch = encodeURIComponent(req.params.recipeSearch);
    
    console.log(recipeSearch);
    
    let recipes;
    try {
        recipes = await Recipe.find().searchByName(recipeSearch);
    } catch(error) {
        const newError = new HttpError(500,"Something went wrong when searching for a recipe by name: ");
        return next(newError);
    }

    if (!recipes || recipes.length === 0) {
        const newError = new HttpError(404,"Could not find any recipes with a name containing the search term.");
        return next(newError);
    }
    
    res.json({recipes: recipes.map(recipe => recipe.toObject( {getters:true} )) });
};

const addNewRecipe = async (req, res, next) => {
    
    //Assemble the request into a JSON object
    let createdRecipe
    try {
        console.log(req.body);
        console.log(req.body.recipeName);
        console.log(req.file);
        //First, assemble the ingredients from the form into an array
        const ingredientList = new Array(req.body.ingredientsAmount.length);
        for (i=0; i<req.body.ingredientsAmount.length; i++) {
            const newIngredient = {
                'amount' : req.body.ingredientsAmount[i],
                'measurement' : req.body.ingredientsMeasurement[i],
                'item' : req.body.ingredientsItem[i] 
            };
            ingredientList[i] = newIngredient;
        }
        //Then, assemble the rest of the recipe form
        createdRecipe = new Recipe( { 
            recipeName: req.body.recipeName,
            recipeDescription: req.body.recipeDescription,
            imageSrc: req.body.imageSrc,
            prepDurationMinutes : req.body.prepDurationMinutes,
            cookDurationMinutes : req.body.cookDurationMinutes,
            recipeServings: req.body.recipeServings,
            ingredients: ingredientList,
            cookingSteps: req.body.cookingSteps
        });
        //Change the image src if we did have a file uploaded, or have it blank otherwise
        if (req.file) {
            createdRecipe.imageSrc = req.file.path
        } else {
            createdRecipe.imageSrc = '';
        }
        
    } catch(error) {
        const newError = new HttpError(500,"Something went wrong assembling the request body: "+error);
        console.log(error);
        return next(newError);
    }
    
    //save the result to the database
    let result
    try {
        result = await createdRecipe.save();
    }
    catch(error) {
        const newError = new HttpError(500,"Something went wrong creating the recipe: "+error);
        return next(newError);
    }

    res.json(result);
    
};

const updateRecipe = async (req, res, next) => {
    //Assemble the request into a JSON object
    let updatedRecipe
    try {
        updatedRecipe = new Recipe( { 
            recipeName: req.body.recipeName,
            recipeDescription: req.body.recipeDescription,
            imageSrc: req.body.imageSrc,
            prepDurationMinutes : req.body.prepDurationMinutes,
            cookDurationMinutes : req.body.cookDurationMinutes,
            recipeServings: req.body.recipeServings,
            ingredients: req.body.ingredients,
            cookingSteps: req.body.cookingSteps
        });
    } catch(error) {
        const newError = new HttpError(500,"Something went wrong assembling the request body: ");
        return next(newError);
    }

    //Make sure that we can find the recipe we are updating
    let recipeToUpdate;
    try {
        recipeToUpdate = await Recipe.findById(req.params.recipeID);
    } catch(error) {
        const newError = new HttpError(404,"Could not find recipe to update.");
        return next(newError);
    }

    //Set the new data to the recipe
    recipeToUpdate.recipeName = updatedRecipe.recipeName
    recipeToUpdate.recipeDescription = updatedRecipe.recipeDescription;
    recipeToUpdate.imageSrc = updatedRecipe.imageSrc;
    recipeToUpdate.prepDurationMinutes = updatedRecipe.prepDurationMinutes;
    recipeToUpdate.cookDurationMinutes = updatedRecipe.cookDurationMinutes;
    recipeToUpdate.recipeServings = updatedRecipe.recipeServings;
    recipeToUpdate.ingredients = updatedRecipe.ingredients;
    recipeToUpdate.cookingSteps = updatedRecipe.cookingSteps;

    //save the result to the database
    try {
        await recipeToUpdate.save();
    }
    catch(error) {
        const newError = new HttpError(500,"Something went wrong updating the recipe.");
        return next(newError);
    }

    res.status(200).json({ recipe: recipeToUpdate.toObject({ getters: true }) });
};

const deleteRecipe = async (req, res, next) => {

    let recipeToDelete;
    try {
        recipeToDelete = await Recipe.findById(req.params.recipeID);
    } catch(error) {
        const newError = new HttpError(404,"Could not find recipe to delete: ");
        return next(newError);
    }

    const imagePath = recipeToDelete.imageSrc;

    try {
        await recipeToDelete.deleteOne();
    }
    catch(error) {
        const newError = new HttpError(500,"Something went wrong attempting to delete recipe."+error);
        return next(newError);
    }

    fs.unlink(imagePath, err => {
        console.log(err);
    });

    res.status(200).json({message: "Successfully deleted recipe."});
};

exports.getAllRecipes = getAllRecipes;
exports.getRandomRecipes = getRandomRecipes;
exports.getRecipeById = getRecipeById;
exports.getRecipeByName = getRecipeByName;
exports.addNewRecipe = addNewRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
