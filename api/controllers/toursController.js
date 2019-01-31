const Jimp = require('jimp');
const async = require('async');

const Tour = require('../models/tour');
const Room = require('../models/room');

exports.getAllTours = (req, res) => {
    Tour.find({}).populate('rooms')
        .then(tours => {
            if(tours) {
                res.status(200).json(tours);
            } else {
                res.status(404).json({
                    message: 'Tours not found'
                })
            }
        })
        .catch(error => {
            console.log(error.message);
        })
};

exports.getTour = (req, res) => {
  Tour.findById(req.params.tourId)
      .then(tour => {
          if(tour) {
              res.status(200).json(tour);
          } else {
              res.status(404).json({
                  message: 'Tour not found'
              })
          }
      })
      .catch(error => {
          console.log(error.message);
      })
};

exports.createTour = (req, res) => {
  const tour = new Tour(req.body);
  tour.rooms = [];
    async.forEachOf(req.files['photos'], function(item, i, next) {
        let filename = req.files['photos'][i].filename.split('.');
        let room = new Room({
            first: i===0,
            name: "Room NO. " + (i+1),
            description: "Room NO. " + (i+1),
            photo: process.env.DEST + req.files['photos'][i].path,
            thumbnail: process.env.DEST + filename[0] + filename[1] + '_thumbnail.jpg'
        });
        let thumbnailPath = req.files['photos'][i].path.slice(0, req.files['photos'][i].path.length - 4) + '_thumbnail.jpg';
        createThumbnail(req.files['photos'][i].path, thumbnailPath);
        room.save(function(err, result) {
            tour.rooms.push(result._id);
            next();
        });
    }, function(err) {
        if(!err) {
            tour.save()
                .then(result => {
                    if(result) {
                        result.populate('rooms', function(err) {
                            if(!err) {
                                res.status(200).send(result);
                            } else {
                                res.status(404).json({
                                    message: "Tour not found."
                                })
                            }
                        });
                    } else {
                        res.status(400).json({
                            message: "Bad request, something went wrong on tour creation."
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            console.log(err);
        }

    });

};

function createThumbnail(imagePath, thumbnailPath) {
    Jimp.read(imagePath)
        .then(image => {
            image.resize(256, Jimp.AUTO);
            image.quality(95);
            image.write(thumbnailPath);
        })
        .catch(error => {
            console.log(error.message);
        })
}

