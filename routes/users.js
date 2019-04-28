const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const express = require('express');
const { User, validateUser, validateEmail } = require('../models/user');
const admin = require('../middleware/admin');
const router = express.Router();

// Note: Order of middleware declarations matters!

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
})


// Auth: Get own 'profile' 
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})


// Register new user
router.post('/', async (req, res) => {
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
        isSeller: false,
        isAdmin: false
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

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

module.exports = router;