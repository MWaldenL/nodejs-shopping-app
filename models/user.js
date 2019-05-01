const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { categorySchema } = require('../models/category');
const { itemSchema } = require('../models/item');
const { transactionSchema } = require('../models/transaction');


const userProductSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 10,
        maxlength: 255,
        required: true,
    },
    category: categorySchema,
    description: {
        type: String,
        minlength: 5,
        maxlength: 5000,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    unitPrice: {
        type: Number,
        required: true,
        default: 0.00
    },
});

const customItemSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
    },
    imgUrl: { 
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    seller: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 10,
                maxlength: 50,
                required: true,
            },
            email: {
                type: String,
                trim: true,
                match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                    'Please fill a valid email address'],
                required: 'Email address is required.'
            },
            number: {
                type: String,
                minlength: 7,
                maxlength: 11, 
                required: true
            }
        })
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            'Please fill a valid email address'],
        required: 'Email address is required.'
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 255,
        required: true,
    },
    number: {
        type: String,
        minlength: 7,
        maxlength: 11, 
        required: true
    },
    productList: {
        type: [ userProductSchema ],
        validate: [ v => v.length < 20 ]
    },
    transactionList: {
        type: [ transactionSchema ],
        validate: [ v => v.length <= 50 ]
    },
    cart: {
        type: [ customItemSchema ],
        validate: [ v => v.length <= 5 ] // 
    },
    isSeller: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(10).max(50).required(),
        email: Joi.string().min(10).max(50).required(),
        password: Joi.string().min(8).max(30).required(),
        number: Joi.string().min(7).max(11).required(),
    };

    return Joi.validate(user, schema);
}

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

exports.User = User;
exports.userSchema = userSchema;
exports.validateUser = validateUser;
exports.validateEmail = validateEmail;