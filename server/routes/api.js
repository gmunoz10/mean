const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Video = require('../models/video');

const db = 'mongodb://mean_db_user:1234@ds127443.mlab.com:27443/mean_db';
mongoose.Promise = global.Promise;
mongoose.connect(db, { useMongoClient: true }, function(err) {
    if(err) {
        console.error("Error! " + err);
    }
});

router.get("/", function(req, res) {
    res.send("api works");
});

router.get("/videos", function(req, res) {
    console.log("Get request for all videos");
    Video.find({})
    .exec(function(err, videos) {
        if(err) {
            console.log("Error retrieving videos");
        } else {
            res.json(videos);
        }
    });
});

router.get("/videos/:id", function(req, res) {
    console.log("Get request for a single video");
    Video.findById(req.params.id)
    .exec(function(err, videos) {
        if(err) {
            console.log("Error retrieving videos");
        } else {
            res.json(videos);
        }
    });
});

module.exports = router;