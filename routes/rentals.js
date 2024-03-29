const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const validate = require('../helpers/validations');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async(req, res)=>{
    const {error} = validate.rental(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send('Invalid Customer');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send('Invalid Movie');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not available');
    let rental = new Rental({
        customer:{_id: customer._id, name: customer.name, phone: customer.phone},
        movie:{_id: movie._id, title: movie.title, dailyRentalRate: movie.dailyRentalRate}
    });
    rental = await rental.save();
    movie.numberInStock--;
    movie.save();
    res.send(rental);
});


router.get('/:id', async(req,res)=>{
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send('Not valid rental');
    res.send(rental);
});

module.exports = router;