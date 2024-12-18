const mongoose = require('mongoose');

const tollsSchema = new mongoose.Schema({
    carNumber: {
        type: String,
        required: true
    },
    tollAmt: {
        type: Number,
        required: true
    },
    carType: {
        type: String,
        required: true
    },
    collectorUsername: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    }
});

const tolls = mongoose.model('tolls', tollsSchema);
module.exports = tolls;
