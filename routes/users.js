const bcrypt = require('bcrypt');
const express = require('express');
const { User, validateUser, validateEmail } = require('../models/user');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
})


// Get own 'profile'
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})


// Get user by ID
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).send('User not found.')
    }

    res.send(user);
})

// Register new user
router.post('/', async (req, res) => {
    // const { error } = validateUser(req.body);
    // if (error) {
    //     return res.status(400).send('Invalid request.');
    // }

    // Check if user already exists with given email
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('User already exists with this email!');
    }

    // Else proceed to create a new user
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        productList: [],
        transactionList: [],
        cart: [],
        number: req.body.number,
        isSeller: req.body.isSeller,
        isAdmin: req.body.isAdmin,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(user);
})


module.exports = router;