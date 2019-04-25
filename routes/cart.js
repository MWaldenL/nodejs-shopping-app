const express = require('express');
const { User } = require('../models/user');
const { Item, validate } = require('../models/item');
const { Category } = require('../models/category');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const seller = require('../middleware/seller');
const router = express.Router();


// Add item to cart 
router.post('/', auth, async(req, res) => {
    const item = await Item
        .findById(req.body.itemId)
        .select({'name': 1, 'description': 1, 'quantity': 1});

    const user = await User.findById(req.user._id);
    const quantity = parseInt(req.body.quantity);

    if (quantity > item.quantity || user.cart.length + quantity > 5) 
        return res.status(400).send('Cart has too many items.')

    if (!item)
        return res.status(404).send('Item not found.')
    
    if (!user)
        return res.status(404).send('User not found.')

    // Add item to cart
    for (let i = 0; i < quantity; i++) {
        user.cart.push(item);
    }

    // Decrement item stock count 
    item.quantity -= quantity;

    await item.save();
    await user.save();

    res.send(item);
})

// Delete from cart
router.delete('/', auth, async(req, res) => {
    const item = await Item.findByIdAndRemove(req.body.itemId);
    res.send(item);
})

module.exports = router;

