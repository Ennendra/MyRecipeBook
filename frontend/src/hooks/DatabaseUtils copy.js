const MongoClient = require('mongodb').MongoClient;

const connectionURL = 'mongodb+srv://GeneralUser:qp6bWVUXYqJSTK26@myrecipebookdb.bmiie.mongodb.net/MyRecipeBook?retryWrites=true&w=majority&appName=MyRecipeBookDB';

const searchRecipes = async (req, res, next) => {
    const client = new MongoClient(connectionURL);
    let recipes;

    try {
        await client.connect();
        const db = client.db();
        const recipes = db.collection("Recipes").find().toArray();
    }
    catch (error) {
        return res.json({message: 'Could not retrieve data'});
    }

    client.close();

    res.json(recipes);
};

const createRecipe = async (req, res, next) => {
    const newRecipe = {
        recipeName: req.body.name,
        recipeDescription: req.body.description
    };
    const client = new MongoClient(connectionURL);

    try {
        await client.connect();
        const db = client.db();
        const result = db.collection("Recipes").insertOne(newRecipe);
    }
    catch (error) {
        return res.json({message: 'Could not store data'});
    }

    client.close();

    res.json(newRecipe);
};

const updateRecipe = async (req, res, next) => {

};

const deleteRecipe = async (req, res, next) => {

};



/*
//     mongodb+srv://GeneralUser:qp6bWVUXYqJSTK26@myrecipebookdb.bmiie.mongodb.net/?retryWrites=true&w=majority&appName=MyRecipeBookDB
function SearchRecipes(searchParameter) {
    //Finding recipes based on name
    //db.Recipes.find( {recipeName: searchParameter} );
}

function CreateRecipe(newRecipeObject) {
    //Creating a new recipe using a recipeObject (created via a form)
    //Note that the _id for the object needs to be generated first, potentially with a find() and getting the highest value
    //db.Recipes.insertOne( {newRecipeObject} );
}

function UpdateRecipe(recipeID, newRecipeObject) {
    //Updating recipe with new recipeObject based on given ID
    //db.Recipes.updateOne( {_id: recipeID} {$set: newRecipeObject} );
    //updateOne() {_id: recipeID} {$set: {recipeName: "name", recipeDescription: "Desc" etc...}} );
}

function DeleteRecipe(recipeID) {
    //Deleting recipe based on ID
    //db.Recipes.deleteOne( {_id: recipeID} )
}
*/

