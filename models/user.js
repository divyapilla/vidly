const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        minlength:5, 
        maxlength:50, 
        required: true},
    email: {
        type:String, 
        minlength: 5, 
        maxlength:50, 
        unique: true, 
        required: true},
    password: {
        type:String, 
        minlength: 8,
         maxlength: 1024, 
         required: true},
    isAdmin:Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);


exports.User = User;