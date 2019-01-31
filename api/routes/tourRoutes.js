const express = require('express');
const router = express.Router();

const images = require('../utilities/images');
const toursController = require('../controllers/toursController');

// GET All tours
router.get('/', toursController.getAllTours);

// GET Tour
router.get('/:tourId', toursController.getTour);

// POST Create tour
router.post('/', images.upload().fields([{ name: 'photos', maxCount: 5 }]), toursController.createTour);



module.exports = router;
