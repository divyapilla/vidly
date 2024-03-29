const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    const {error} = validate.user(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already exists');
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});


// router.put('/:id', async(req, res)=>{
//     const {error} = validate.user(req.body);
//     if(error) return res.status(400).send(error.details[0].message);
//     const user = await User.findByIdAndUpdate(req.params.id, {name: req.body.name, email: req.body.email, password: req.body.password});
//     if(!user) return res.status(404).send('Invalid User');
//     res.send(user);
// });

// router.delete('/:id', async(req, res)=>{
//     const user = await User.findByIdAndRemove(req.params.id);
//     if(!user) return res.status(404).send('Invalid User');
//     res.send(user);
// });

// router.get('/:id', async(req, res)=>{
//     const user = await User.findById(req.params.id);
//     if(!user) return res.status(404).send('Invalid User');
//     res.send(user);
// });

module.exports = router;