const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const _ = require('lodash');
const validate = require('../helpers/validations');
const { User } = require('../models/user');
const router = express.Router();

router.get('/', async(req, res)=> {
    const user = await User.find().sort('name');
    res.send(user);
});

router.post('/', async(req, res)=>{
    const {error} = validate.auth(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid User or password');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid User or password');

    const token = user.generateAuthToken();
    res.send(token);
});


module.exports = router;