const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const users = require('./routes/users');
const items = require('./routes/items');
const cart = require('./routes/cart');
const categories = require('./routes/categories');
const app = express();
const url = 'mongodb://localhost/shopping-app'

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.log('Could not connect to MongoDB.'));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/categories', categories);
app.use('/api/products', items);
app.use('/api/cart', cart);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on Port ${port}`));


