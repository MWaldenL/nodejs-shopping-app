const express = require('express');
const { User } = require('../models/user');
const { Item, validate } = require('../models/item');
const { Category } = require('../models/category');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const seller = require('../middleware/seller');
const router = express.Router();


// Buyer: Show all products 
router.get('/', auth, async (req, res) => {
    const items = await Item.find().sort('name');
    res.send(items);
})

// Buyer: Show products by category
router.get('/category/:id', auth, async (req, res) => {
    const item = await Item
        .find({ 'category._id': req.params.id })
        .sort('name');

    if (!item) {
        return res.status(404).send('Item not found.')
    }

    res.send(item);
})

// Buyer: Show products by seller
router.get('/seller/:id', auth, async (req, res) => {
    const item = await Item
        .find({ 'seller._id': req.params.id })
        .sort('name');

    if (!item) {
        return res.status(404).send('Item not found.')
    }

    res.send(item);
})


// Seller: Add new product
router.post('/', auth, seller, async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send('Invalid request.');

    // Check if seller product list exceeds 20 items
    let _seller = await User.findById(req.user._id);
    if (_seller.productList.length === 20) {
        return res.status(400).send('Max number of items reached')
    }

    let _category = await Category.findById(req.body.categoryId);
    let item = new Item({
        name: req.body.name,
        category: _category,
        description: req.body.description,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        seller: _seller
    })

    // Add item to product list
    _seller.productList.push(item);
    await _seller.save();

    await item.save();
    res.send('Item successfully saved!');
})

// Seller: Edit product
router.put('/:id', auth, seller, async(req, res) => {
    let { error } = validate(req.params.body);
    if (error)
        return res.status(400).send('Item not found.');

    const _category = await Category.findById(req.body.categoryId);
    if (!_category) 
        return res.status(400).send(`Category not found with id ${req.body.categoryId}`);

    const item = await Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: _category,
        description: req.body.description,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
    });

    if (!item) 
        return res.status(404).send('Item not found.');
    
    res.send('Item successfully saved.');
})

// Seller: Delete product
router.delete('/:id', auth, seller, async(req, res) => {
    const item = await Item.findByIdAndRemove(req.params.id);
    if (!item) 
        return res.status(404).send('Item not found.');

    res.send(`${item.name} successfully deleted.`);
})

// router.use(function(req, res, next) {
//     const token = req.cookies.auth;

//     if (!token)
//         return res.status(401).send('Access denied. No token provided.');

//     try {
//         const decoded = jwt.verify(token, config.get('jwtPrivateKey'));    
//         req.user = decoded;
//         next();
//     } catch (ex) {
//         res.status(400).send('Invalid token.');
//     }
// });


module.exports = router;