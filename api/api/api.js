'use strict';

const express = require('express');
const mongoose = require('mongoose');
const slug = require('slug');
const xssFilters = require('xss-filters');

const BitModel = require('./models/bit');

const router = express.Router();

const identifierFromName = function(name) {
    return slug(name).toLowerCase();
};

router.get('/:type', function(req, res, next) {
    const bits = BitModel.find({
        type: req.params.type
    }, function(err, bits) {
        if (bits) {
            const returnObj = [];
            bits.forEach(function(e, i) {
                const entry = {
                    name: e.name,
                    type: e.type,
                    id: e.identifier
                };
                returnObj.push(entry);
            });
            res.json(returnObj);
        } else {
            res.sendStatus(404);
        }
    });
});

router.get('/:type/:identifier', function(req, res, next) {
    const bits = BitModel.findOne({
        type: req.params.type,
        identifier: req.params.identifier
    }, function(err, bit) {
        if (bit) {
            const obj = {};
            obj[req.params.identifier] = {
                author: bit.author,
                source: bit.source,
                type: bit.type
            };
            res.json(obj);
        } else {
            res.sendStatus(404);
        }
    });
});

router.post('/:type/', function(req, res, next) {
    const identifier = identifierFromName(req.body.name);

    BitModel.findOne({
        identifier: identifier
    }, function(err, bit) {
        if (bit) {
            // Bit exists already, escalate
            res.sendStatus(418);
        } else {
            const bit = new BitModel({
                name: xssFilters.inHTMLData(req.body.name),
                author: xssFilters.inHTMLData(req.body.author),
                source: xssFilters.inHTMLData(req.body.source),
                type: xssFilters.inHTMLData(req.body.type),
                identifier: identifier
            }).save();
            res.sendStatus(200);
        }
    });
});

router.delete('/:type/:id', function(req, res, next) {
    res.send(403);
});

module.exports = router;
