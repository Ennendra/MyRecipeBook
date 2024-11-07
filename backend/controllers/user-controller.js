const fs = require('fs');
//Schema models and the error handler model
const HttpError = require('../models/httpError');
const User = require('../models/users');
const Recipe = require('../models/recipe');
//The mongoose API
const mongoose = require("mongoose");
//Validations
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res, next) => {
    //Define the result
    let users;
    //Attempt to find all users
    try {
        users = await User.find({});
    } catch(error) {
        return next( HttpError(500,"Something went wrong obtaining the user list: ") );
    }
    res.json({users: users.map(user => user.toObject( {getters:true} )) });
};

const login = async (req, res, next) => {
    console.log(req.body);
    const email = req.body.loginEmail;
    const password = req.body.loginPassword;

    //Checks if there is a user with the same email
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch(error) {
        return next( new HttpError(500, 'Something went wrong with login') );
    }
    //If no user exists, return an error
    if (!existingUser) {
        return next( new HttpError(403, 'Invalid credentials, could not log in.') );
    }

    //The user exists, now we check if the password matches
    let isValidPassword=false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return next( HttpError(500, 'Could not log you in, please check your credentials and try again.') );
    }
    //Password does not match
    if (!isValidPassword) {
        return next( new HttpError(403, 'Invalid credentials, could not log in.') );
    }

    //Successful login
    //Generate the webtoken for the client and login
    let token;
    try {
    token = jwt.sign(
        {userId: existingUser.id, email: existingUser.email}, 
        'JWTKEYHERE', 
        {expiresIn: '7d'}
    );
    }catch (error) {
        return next( new HttpError(500, 'Something went wrong with login') );
    }

    res.status(201).json({ userId: existingUser.id, email: existingUser.email, token: token});
};

const signup = async (req, res, next) => {

    //Check if there were any validation errors defined in user-routes
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next( new HttpError(422, 'Invalid inputs were passed in. Please check your data: ') );
    }

    //Get the items from the frontend form
    const name = req.body.signupName;
    const email = req.body.signupEmail;
    const password = req.body.signupPassword;

    //Checks if there is a user with the same email
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch(error) {
        return next( new HttpError(500, 'Something went wrong with signup.') );
    }
    //If the user exists, send an error back describing this
    if (existingUser) {
        return next( new HttpError(422, 'User exists already, please login instead.') );
    }

    

    //hashing password
    let hashedPassword;
    try {
        console.log("Pre-hash");
        hashedPassword = await bcrypt.hash(password, 12);
        console.log(hashedPassword);
    } catch (error) {
        return next( new HttpError(500, 'Something went wrong with signup.') );
    }
    
    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        recipes: []
    })

    //attempt to save the new user
    let createdUser
    try {
        createdUser = await newUser.save();
    }
    catch(error) {
        return next( new HttpError(500,"Something went wrong with signup.") );
    }

    //Generate the webtoken for the client and login
    let token;
    try {
    token = jwt.sign(
        {userId: createdUser.id, email: createdUser.email}, 
        'JWTKEYHERE', 
        {expiresIn: '7d'}
    );
    }catch (error) {
        return next( new HttpError(500, 'Something went wrong with signup. Token generation' + error) );
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token});
};

exports.getAllUsers = getAllUsers;
exports.login = login;
exports.signup = signup;