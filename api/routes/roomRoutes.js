const express = require('express');
const router = express.Router();

const roomsController = require('../controllers/roomsController');


// GET Room
router.get('/:roomId', roomsController.getRoom);

// POST Add arrow to specific room
router.post('/:roomId', roomsController.addArrowToRoom);

module.exports = router;
