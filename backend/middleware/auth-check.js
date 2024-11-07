const HttpError = require('../models/httpError');
const jwt = require('jsonwebtoken');

//Checks that the user is properly logged in. This runs from the routes before any function that requires this check
//Adds the users ID to the request if successful
module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; //e.g. Authorization: 'Bearer TOKEN'
        if (!token) {throw new Error();}

        const decodedToken = jwt.verify(token, 'JWTKEYHERE');
        req.userData = {userId: decodedToken.userId};
        next();

    } catch(error) {
        return next( new HttpError(401, 'Authenication failed' + error) );
    }
};