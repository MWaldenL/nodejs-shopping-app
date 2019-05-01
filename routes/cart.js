const express = require('express');
const { User } = require('../models/user');
const { Item, validate } = require('../models/item');
const { Transaction } = require('../models/transaction');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user)
        return res.status(404).send('User not found.');

    res.send(user.cart);
})

// Add item to cart 
router.post('/', auth, async (req, res) => {
    const item = await Item
        .findById(req.body.itemId)
        .select({'name': 1, 'imgUrl': 1, 'seller': 1});

    const user = await User.findById(req.user.id);
    // const quantity = parseInt(req.body.quantity);

    // Validation
    if (!user)
        return res.status(404).send('User not found.')

    if (!item) {
        console.log(req.body);
        return res.status(404).send('Item not found.')
    }

    if (user.cart.length + 1 > 5) 
        return res.status(400).send('Cart has too many items.')

    // Add item to cart
    // for (let i = 0; i < quantity; i++) {
        user.cart.push(item);
    // }

    await user.save();

    res.json(item);
})


router.post('/checkout', auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    const item = await Item.findById(req.body.itemId);

    if (!item) {
        return res.status(404).send('Item not found.')
    }

    if (req.user.id === item.seller._id) {
        return res.status(400).send("You can't buy your own products!");
    }

    const _seller = await User.findById(item.seller._id);

    // Create a new transaction object
    const transaction = new Transaction({
        date: Date.now(),
        items: [ item ],
        buyer: user,
        seller: _seller,
        totalAmount: item.unitPrice
    })

    // Decrement item stock count 
    item.quantity -= 1;

    // Remove item from user's cart
    let itemIndex = user.cart.indexOf(item);
    user.cart.splice(itemIndex, 1);

    // Save the transaction
    await transaction.save();
    await item.save();
    await user.save();

    res.send(transaction);
})


// Delete from cart
router.delete('/:id', auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    const targetItem = user.cart.find(item => item.id === req.params.id);
    
    if (!targetItem)
        return res.status(404).send('Item not found.')

    let itemIndex = user.cart.indexOf(targetItem);

    user.cart.splice(itemIndex, 1);

    user.save();
    res.json(targetItem);
})

module.exports = router;

