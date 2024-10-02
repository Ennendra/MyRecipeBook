//Import the express, mongoose and bodyparser libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//importing the router for the recipes and the error handler
const recipeRoutes = require('./routes/recipe-routes');
const HttpError = require('./models/httpError');

//initialise the express API
const app = express();
//use the library to automatically parse body requests into JSON format
app.use(bodyParser.json());

//Defining headers
//LEAVING COMMENTED UNTIL I UNDERSTAND WHAT THEY DO
/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });*/

//Set the port the server-backend will listen through
const PORT = 5000; 

//The routes that check for recipes
app.use('', recipeRoutes);
//An error to be thrown if the url route is not a defined one in the routes js files
app.use((req, res, next) => {
    const error = new HttpError(404,'Could not find this route')
    throw error;
});
//A middleware route that will act any time an error is returned on other routes
app.use((error, req, res, next) => {
    //Check if an error has already been sent
    if (res.headerSent) {
        return next(error);
    }
    //No error sent yet, we can send our own (or a default 500 'unknown error' if no specific error is defined)
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred'});
});

//establish a connection to the MongoDB database and start the server listening when successful
mongoose.connect('mongodb+srv://GeneralUser:qp6bWVUXYqJSTK26@myrecipebookdb.bmiie.mongodb.net/MyRecipeBook?retryWrites=true&w=majority&appName=MyRecipeBookDB')
.then(() => {
    app.listen(PORT);
}).catch((err) => {
    console.log(err);
});