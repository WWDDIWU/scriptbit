'use strict';
const mongoose = require('mongoose');
const BitModel = require('./api/models/bit');

mongoose.connect('mongodb://localhost/scriptbit');

(new BitModel({
    name: 'Alert',
    author: 'queenmarv',
    source: 'alert(1);',
    type: 'js',
    identifier: 'alert'
})).save(function(err, a) {
    (new BitModel({
        name: 'E-Mail validation',
        author: 'tester',
        source: 'function {console.log("wrong");}',
        type: 'js',
        identifier: 'email validation'
    })).save(function(err, a) {
        process.exit();
    });
});
