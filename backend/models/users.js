const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

//Schema: Has a username, email, password and references to any recipes this user has created
const userSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 6},
    recipes: [{type: mongoose.Types.ObjectId, required: true, ref: 'Recipe' }]
});

//plug in the unique validator so it will check the email is unique when a post request is called
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);