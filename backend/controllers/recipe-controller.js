const fs = require('fs');
//Schema models and the error handler model
const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');
const Recipe = require('../models/recipe');
const User = require('../models/users');
//The mongoose API
const mongoose = require('mongoose');


const getAllRecipes = async (req, res, next) => {
    //Define the result
    let recipes;
    //Attempt to find all recipes
    try {
        recipes = await Recipe.find({});
    } catch(error) {
        return next( new HttpError(500,'Something went wrong obtaining the recipe list') );
    }
    res.json({recipes: recipes.map(recipe => recipe.toObject( {getters:true} )) });
};

const getRandomRecipes = async (req, res, next) => {
    //Define the result
    let recipes;
    //Attempt to find all recipes
    try {
        recipes = (await Recipe.find({isPrivate: false}));
    } catch(error) {
        return next( new HttpError(500,'Something went wrong obtaining the recipe list') );
    }

    //Randomise the recipes and get the first 3 of them
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
        return next( new HttpError(500,'Something went wrong when searching for a recipe by ID') );
    }
    //return a 404 error if no recipe is found
    if (!recipe) {
        return next( new HttpError(404,'Could not find a recipe with the given ID.') );
    }

    //If the recipe is private and the current user is not authenticated as the creator, act as if the recipe does not exist
    if (recipe.isPrivate) {
        if (!(req.userData && recipe.creator.toString() === req.userData.userId)) {
            console.log("Recipe found but not right auth")
            return next( new HttpError(404,'Could not find a recipe with the given ID.') );
        }
    }
    
    res.json({recipes: recipe.toObject({getters: true}) });
};

const getRecipeByName = async (req, res, next) => {
    //define the search parameter, convert the parameter into utf format
    const recipeSearch = encodeURIComponent(req.params.recipeSearch);

    let recipes;
    try {
        //Checks that the recipe is not private and the search matches the beginning of any word in the recipe name
        recipes = await Recipe.find({
            isPrivate: false,
            recipeName: { $regex: `\\b${recipeSearch}`, $options: 'i' }
        });
    } catch(error) {
        return next( new HttpError(500, 'Something went wrong when searching for a recipe by name' + error) );
    }

    if (!recipes || recipes.length === 0) {
        return next( new HttpError(404, 'Could not find any recipes with a name containing the search term.') );
    }
    
    res.json({recipes: recipes.map(recipe => recipe.toObject( {getters:true} )) });
};

const getRecipeByUser = async (req, res, next) => {
    const userId = req.params.uid;

    let isAuthenticatedUser=false;
    if (req.userData){console.log(userId + ' --- ' + req.userData.userId)} else {console.log("no login data")}
    if (req.userData && userId === req.userData.userId) {
        console.log("This is authenticated user, will show private")
        isAuthenticatedUser=true;
    }
    let userWithRecipes;
    if (req.userData && userId === req.userData.userId) {
        try {
            //userWithRecipes = await User.findById(userId).populate('recipes')
            userWithRecipes = await Recipe.find({
                //isPrivate: false,
                creator: userId
            });
        } catch(error) {
            return next( new HttpError(500,'Something went wrong when searching for a recipe by ID') );
        }
    } else {
        try {
            userWithRecipes = await Recipe.find({
                isPrivate: false,
                creator: userId
            });
            //userWithRecipes = await User.findById(userId).populate('recipes')
        } catch(error) {
            return next( new HttpError(500,'Something went wrong when searching for a recipe by ID') );
        }
    }
    

    //If we can't find the user or if the user has no recipes
    if (!userWithRecipes || userWithRecipes.length === 0) {
        return next( new HttpError(404,'Could not find recipes for the given user') );
    }

    res.json({recipes: userWithRecipes.map( recipe => recipe.toObject({getters:true}) )})
}

const addNewRecipe = async (req, res, next) => {

    //Check if there were any validation errors defined in recipe-routes
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next( new HttpError(422, 'Invalid inputs were passed in. Please check your data: ') );
    }

    console.log(req.body);

    //Assemble the request into a JSON object
    let createdRecipe
    try {
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
            cookingSteps: req.body.cookingSteps,
            isPrivate: req.body.isPrivate,
            creator: req.userData.userId
        });
        //Change the image src if we did have a file uploaded, or have it blank otherwise
        if (req.file) {
            createdRecipe.imageSrc = req.file.path
        } else {
            createdRecipe.imageSrc = '';
        } 
    } catch(error) {
        return next( new HttpError(500, 'Something went wrong creating the recipe') );
    }
    //Check that a valid user is creating the recipe
    let user;
    try{
        user = await User.findById(req.userData.userId);
    } catch(error) {
        return next( new HttpError(500, 'Something went wrong creating the recipe') );
    }
    if (!user) {
        return next( new HttpError(404, 'Could not find a user for provided id') );
    }
    
    console.log(user);

    //save the result to the database
    let result;
    try {
        //Create a mongoose session to:
        // - Save the recipe to the database
        // - Save a reference to the recipe to the user's recipes section
        const session = await mongoose.startSession();
        session.startTransaction();
        result = await createdRecipe.save({session: session});
        user.recipes.push(createdRecipe);
        await user.save({session: session});
        session.commitTransaction();
    }
    catch(error) {
        return next( new HttpError(500, 'Something went wrong creating the recipe') );
    }
    res.status(201).json(result);
    //res.status(201).json({ recipe: createdRecipe });
};

const updateRecipe = async (req, res, next) => {

    //Check if there were any validation errors defined in recipe-routes
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError(422, 'Invalid inputs were passed in. Please check your data: ')
        );
    }

    //Assemble the request into a JSON object
    let updatedRecipe
    try {
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
        updatedRecipe = new Recipe( { 
            recipeName: req.body.recipeName,
            recipeDescription: req.body.recipeDescription,
            imageSrc: req.body.imageSrc,
            prepDurationMinutes : req.body.prepDurationMinutes,
            cookDurationMinutes : req.body.cookDurationMinutes,
            recipeServings: req.body.recipeServings,
            ingredients: ingredientList,
            cookingSteps: req.body.cookingSteps,
            isPrivate: req.body.isPrivate,
            creator: req.userData.userId
        });
        //Change the image src if we did have a file uploaded, or have it blank otherwise
        if (req.file) {
            updatedRecipe.imageSrc = req.file.path
        } else {
            updatedRecipe.imageSrc = '';
        } 
    } catch(error) {
        return next( new HttpError(500,'Something went wrong assembling the request body') );
    }

    //Make sure that we can find the recipe we are updating
    let recipeToUpdate;
    try {
        recipeToUpdate = await Recipe.findById(req.params.recipeID);
    } catch(error) {
        return next( new HttpError(404,'Could not find recipe to update.') );
    }

    //Prevent updating the recipe if the user attempting to delete isn't the creator
    if (recipeToUpdate.creator.toString() !== req.userData.userId) {
        return next( new HttpError(401,'Forbidden from updating the place') );
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
    recipeToUpdate.isPrivate = updatedRecipe.isPrivate;

    //save the result to the database
    try {
        await recipeToUpdate.save();
    }
    catch(error) {
        return next( new HttpError(500,'Something went wrong updating the recipe.') );
    }

    res.status(200).json({ recipe: recipeToUpdate.toObject({ getters: true }) });
};

const deleteRecipe = async (req, res, next) => {

    //Checks that the recipe to delete exists
    let recipeToDelete;
    try {
        recipeToDelete = await Recipe.findById(req.params.recipeID).populate('creator');
    } catch(error) {
        return next( new HttpError(500,'Something went wrong attempting to delete recipe.') );
    }

    //Cannot find the recipe
    if (!recipeToDelete) {
        return next( new HttpError(404,'Could not find recipe to delete') );
    }
    //Prevent deleting the recipe if the user attempting to delete isn't the creator
    console.log(recipeToDelete.creator.id + ' --- ' + req.userData.userId)
    if (recipeToDelete.creator.id !== req.userData.userId) {
        return next( new HttpError(401,'Forbidden from deleting the place') );
    }

    //Define the image to delete
    const imagePath = recipeToDelete.imageSrc;

    //Attempt to delete the recipe
    try {
        //Create a mongoose session to:
        // - Remove the recipe from the database
        // - Remove the reference to the recipe from the user's recipes section
        const session = await mongoose.startSession();
        session.startTransaction();
        await recipeToDelete.deleteOne({ _id: recipeToDelete._id }, {session: session});
        recipeToDelete.creator.recipes.pull(recipeToDelete);
        await recipeToDelete.creator.save({session: session});
        await session.commitTransaction();
    }
    catch(error) {
        return next( new HttpError(500,'Something went wrong attempting to delete recipe. ' + error) );
    }

    //Delete the image file
    fs.unlink(imagePath, err => {
        console.log(err);
    });

    res.status(200).json({message: 'Successfully deleted recipe.'});
};

exports.getAllRecipes = getAllRecipes;
exports.getRandomRecipes = getRandomRecipes;
exports.getRecipeById = getRecipeById;
exports.getRecipeByName = getRecipeByName;
exports.getRecipeByUser = getRecipeByUser;
exports.addNewRecipe = addNewRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
