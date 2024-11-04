const express = require('express');

const userController = require('../controllers/user-controller');

const router = express.Router();

/*
    Routes to remember: These are routes that the frontend will navigate to when interacting with the app (ie. everything after the domain e.g. 'localhost:3000/<route>')
        /profile - view currently logged in user (if no user is logged in, will redirect to login)
        /login/:userEmail - search for the user whose email matches the given email (password too)
        /signup - POST the new user after the form is validated
*/