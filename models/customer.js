const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name:{
        type: String,
         required: true, 
         minlength: 5, 
         malength: 50},
    isGold:{
        type:Boolean,
         default:false},
    phone:{
        type:String, 
        required:true,
         min:5, 
         max:15
        }
}));

exports.Customer = Customer;

