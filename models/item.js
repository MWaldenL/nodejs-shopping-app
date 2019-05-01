const Joi = require('joi');
const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 10,
        maxlength: 255,
        required: true,
    },
    category: new mongoose.Schema({
        name: {
            type: String,
            maxlength: 50,
            required: true,
        }
    }),
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
    imgUrl: { 
        type: String,
        default: ''
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
});

const Item = mongoose.model('Item', itemSchema);

function validateItem(item) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        categoryId: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(5).max(5000),
        imgUrl: Joi.string().min(3),
        quantity: Joi.number().min(0).required(),
        unitPrice: Joi.number().min(0).required(),
    }

    return Joi.validate(item, schema)
}

exports.Item = Item;
exports.itemSchema = itemSchema;
exports.validate = validateItem;