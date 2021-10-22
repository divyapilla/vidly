const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String, 
        required:true,
        trim:true, 
        minlength: 5, 
        maxlength: 50
    },
    genre: {
        type: genreSchema, 
        required: true
    },
    numberInStock: {
        type: Number,
         min: 5,
         max: 50, 
         requied: true
        },
    dailyRentalRate: {
        type: Number, 
        min:5, 
        max: 50, 
        required: true
    }
}));




exports.Movie = Movie;
