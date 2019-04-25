const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const Joi = require('joi');
const { User } = require('../models/user')
const router = express.Router();

router.use(cookieParser());

router.get('/', async (req, res) => {
    const users = await User.find().sort('-dateOut');
    res.send(users);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send('Invalid user');
    }

    let user = await User.findOne({ email: req.body.email });
    let validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!user) 
        return res.status(400).send("Invalid email.");
    if (!validPassword) 
        return res.status(400).send("Invalid password.");
    

    const token = user.generateAuthToken();
    res.cookie('auth', token);
    res.send(token);
});


function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
}

module.exports = router;