const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = mongoose.Schema({
    name: {type: String},
    description: {type: String},
    rooms: [{type: Schema.Types.ObjectId, ref: 'Room'}]
});

module.exports = mongoose.model('Tour', tourSchema);

