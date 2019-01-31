const Room = require('../models/room');

exports.getRoom = (req, res) => {
    Room.findById(req.params.roomId)
        .then(room => {
            if(room) {
                res.status(200).send(room);
            } else {
                res.status(404).json({
                    message: "Room not found"
                })
            }
        })
};

exports.addArrowToRoom = (req, res) => {
    Room.findByIdAndUpdate({_id: req.params.roomId}, {$push: {arrows: {position: req.body.position, destination: req.body.destination}}}, {new: true})
        .then(room => {
            if(room) {
                res.status(200).json(room);
            } else {
                res.status(404).json({
                    message: "Room not found"
                })
            }
        })
        .catch(error => {
            console.log(error.message);
        })
};
