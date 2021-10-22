const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: { type: new mongoose.Schema({
             name: {
                    type: String, 
                    required: true, 
                    minlength: 5, 
                    maxlenth: 50},
             isGold: {
                    type:Boolean, 
                    default: false},
             phone: {
                    type: String, 
                    minlength: 5, 
                    maxlength:50, 
                    required: true}}), required: true},
      movie: {
             type: new mongoose.Schema({
             title: {
                    type: String, 
                    required: true, 
                    trim:true, 
                    minlength: 5, 
                    maxlength: 50},
             dailyRentalRate: {
                    type: Number, 
                    min: 0, 
                    max: 50, 
                    required: true}}), required: true},
     dateOut: {type: Date, required: true, default: Date.now},
     dateReturned: {type: Date},
     rentalFee: {type: Number, min: 0}        
}));

exports.Rental = Rental;





