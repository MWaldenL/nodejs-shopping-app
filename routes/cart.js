const express = require('express');
const { User } = require('../models/user');
const { Item, validate } = require('../models/item');
const { Transaction } = require('../models/transaction');
const auth = require('../middleware/auth');
const router = express.Router();


// Add item to cart 
router.post('/', auth, async (req, res) => {
    // Get item, user, and quantity
    const item = await Item
        .findById(req.body.itemId)
        .select({'name': 1, 'description': 1, 'quantity': 1, 'seller': 1});

    const user = await User.findById(req.user._id);

    // Validation
    if (!user)
        return res.status(404).send('User not found.')

    if (!item)
        return res.status(404).send('Item not found.')

    if (user.cart.length + 1 > 5) 
        return res.status(400).send('Cart has too many items.')

    // Add item to cart
    user.cart.push(item);

    await user.save();

    res.send(`${item.name} added to cart!`);
})


// TODO: Checkout single item - Issue
router.post('/checkout', auth, async (req, res) => {
    // Get item by id
    const user = await User.findById(req.user._id);
    const item = user.cart.find(item => item.id === req.body.itemId);

    console.log(user);

    if (!item) {
        return res.status(404).send('Item not found.')
    }

    const _seller = await User.findById(item.seller._id);

    // Create a new transaction object
    const transaction = new Transaction({
        date: Date.now(),
        items: [ item ],
        buyer: req.user,
        seller: _seller,
        totalAmount: item.unitPrice
    })

    // Decrement item stock count 
    item.quantity -= 1;

    // Save the transaction
    await transaction.save();
    await item.save();

    res.send(transaction);
})


// Delete from cart
router.delete('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    const targetItem = user.cart.find(item => item.id === req.body.itemId);

    if (!targetItem)
        return res.status(404).send('Item not found.')

    let itemIndex = user.cart.indexOf(targetItem);

    user.cart.splice(itemIndex, 1);

    user.save();
    res.send(`${targetItem.name} successfully removed.`);
})

module.exports = router;

