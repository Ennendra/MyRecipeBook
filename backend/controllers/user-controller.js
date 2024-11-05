const fs = require('fs');
//Schema models and the error handler model
const HttpError = require('../models/httpError');
const User = require('../models/users');
//The mongoose API
const mongoose = require("mongoose");

const getAllUsers = async (req, res, next) => {
    //Define the result
    let users;
    //Attempt to find all users
    try {
        users = await User.find({});
    } catch(error) {
        const newError = new HttpError(500,"Something went wrong obtaining the user list: ");
        return next(newError);
    }
    res.json({users: users.map(user => user.toObject( {getters:true} )) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    //Checks if there is a user with the same email
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch(error) {
        const newError = new HttpError(500,"Something went wrong with login");
        return next(newError);
    }
    //If no user exists, return an error
    if (!existingUser) {
        const error = new HttpError(403, 'Invalid credentials, could not log in.');
        return next(error);
    }

    //The user exists, now we check if the password matches
    let isValidPassword=false;

    if (!isValidPassword) {
        const error = new HttpError(403, 'Invalid credentials, could not log in.');
        return next(error);
    }
};

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    //Checks if there is a user with the same email
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch(error) {
        const newError = new HttpError(500,"Something went wrong with signup: ");
        return next(newError);
    }
    //If the user exists, send an error back describing this
    if (existingUser) {
        const error = new HttpError(422, 'User exists already, please login instead.');
        return next(error);
    }

    //hashing password
    let hashedPassword;
    hashedPassword = password;

    //Creating the user as an object
    const newUser = {
        name,
        email,
        hashedPassword,
        recipes: []
    };

    //attempt to save the new user
    let result
    try {
        result = await newUser.save();
    }
    catch(error) {
        const newError = new HttpError(500,"Something went wrong with signup.");
        return next(newError);
    }

    res.json(result);
};

exports.getAllUsers = getAllUsers;
exports.login = login;
exports.signup = signup;