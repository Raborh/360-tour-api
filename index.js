const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const index = express();

const tourRoutes = require('./api/routes/tourRoutes');
const roomRoutes = require('./api/routes/roomRoutes');


index.use(bodyParser.urlencoded({ extended: false }));
index.use(bodyParser.json());

mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useFindAndModify: false});

// TODO change Access-Control-Allow-Origin on deploy
index.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, Origin, x-requested-with, Content-Type, Content-Range, Content-Disposition, Content-Description');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

index.use('/tours', tourRoutes);
index.use('/rooms', roomRoutes);

index.use('/uploads', express.static('uploads'));
index.use('/images', express.static('images'));

module.exports = index;
