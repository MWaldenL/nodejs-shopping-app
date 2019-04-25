const express = require('express');
const { Category, validate } = require('../models/category');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all categories
router.get('/', admin, async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send('Bad request.');
    }

    const categories = await Category.find().sort('name');
    res.send(categories);
})


// Get category by ID
router.get('/:id', admin, async (req, res) => {
    const category = await User.findById(req.params.id);

    if (!category) {
        return res.status(404).send('User not found.')
    }

    res.send(category);
})


router.post('/', admin, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send('Invalid request.');
    }   

    const category = new Category({
        name: req.body.name
    })
    
    await category.save();
    res.send(category);
})


module.exports = router;