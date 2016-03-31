'use strict';
const mongoose = require('mongoose');

const BitSchema = mongoose.Schema({
    name: String,
    author: String,
    source: String,
    type: String,
    identifier: String
});

const Bit = mongoose.model('Bit', BitSchema);

module.exports = Bit;
