const mongoose = require('mongoose');

const collectorsSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const collectors = mongoose.model('collectors', collectorsSchema);
module.exports = collectors;
