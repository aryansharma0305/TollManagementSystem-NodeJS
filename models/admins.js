const mongoose = require('mongoose');

const adminsSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const admins = mongoose.model('admins', adminsSchema);
module.exports = admins;
