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

exports.getAllUsers = getAllUsers;