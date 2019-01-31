const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = mongoose.Schema({
        first: {type: Boolean},
        name: {type: String},
        description: {type: String},
        photo: {type: String},
        thumbnail: {type: String},
        arrows: [{
            _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
            position: {
                x: {type: Number},
                y: {type: Number},
                z: {type: Number}
            },
            destination: {type: Schema.Types.ObjectId, ref: 'Room'}
        }]
});

module.exports = mongoose.model('Room', roomSchema);

