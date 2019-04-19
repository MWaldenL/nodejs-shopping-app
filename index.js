const express = require('express');
const mongoose = require('mongoose');
const app = express();
const url = 'mongodb://localhost/shopping-app'

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(console.log('Could not connect to MongoDB.'));

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));


