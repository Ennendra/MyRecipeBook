const express = require('express');

const userController = require('../controllers/user-controller');
const { check } = require('express-validator');

const router = express.Router();

/*
    Routes to remember: These are routes that the frontend will navigate to when interacting with the app (ie. everything after the domain e.g. 'localhost:3000/<route>')
        /profile - view currently logged in user (if no user is logged in, will redirect to login)
        /login/:userEmail - search for the user whose email matches the given email (password too)
        /signup - POST the new user after the form is validated
*/

router.get(`/getUsers`, userController.getAllUsers);

router.post(`/login`, userController.login);

router.post(`/signup`, [
    check('signupName').not().isEmpty(),
    check('signupEmail').normalizeEmail().isEmail(),
    check('signupPassword').isLength({min: 6})
    .custom((value, {req, loc, path}) => {
        if (value !== req.body.signupConfirmPassword) 
            { throw new Error ("Passwords don't match"); }
        else 
            { return value; }
    })
], userController.signup);

module.exports = router;
