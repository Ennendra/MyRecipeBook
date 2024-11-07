
const jwt = require('jsonwebtoken');

//Checks that the user is properly logged in
//Adds the users ID to the request if successful
//This acts almost identically to auth-check, but does not return an error if not authenticated
//Where this is used, the controller will have other checks based on req.userData (e.g. whether to hide private recipes or not)
module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; //e.g. Authorization: 'Bearer TOKEN'
        if (!token) 
            {
                console.log("No user login.");
                throw new Error();
            }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = {userId: decodedToken.userId};
        next();

    } catch(error) {
        console.log("Secondary login error");
        next();
    }
};