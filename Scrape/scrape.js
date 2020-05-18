'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const ScrapeSchema = new mongoose.Schema({
    id: {
        type:String,
        required:true,
        trim: true,
        minlength:6
    },
    scrapedDate: {
        type: Date,
        required: true,
        maxlength:30

    },
    scrapedData: {
        type: Object,
        required: true,
        minlength:6

    }
});


ScrapeSchema.methods.saveUserScrapedData = function () {
    var Scrape = this;
    return Scrape.save().then((acg) => { //TDOD: based  on user input should update currently stored FB,TW, or IG URL before saving a new record
        if(!acg) {
            return Promise.reject("unable to save user Scrape");
        } else {
            return Promise.resolve("user Scrape saved"); 
        }
    });
}

ScrapeSchema.methods.UpdateUserScrapedData = function () {
    var Scrape = this;
    return Scrape.save().then((acg) => { //TDOD: based  on user input should update currently stored FB,TW, or IG URL before saving a new record
        if(!acg) {
            return Promise.reject("unable to save user Scrape");
        } else {
            return Promise.resolve("user Scrape saved"); 
        }
    });
}



ScrapeSchema.methods.checkForValidToken = function (token)  {
    var decoded;
    try {
        decoded = jwt.verify(token,"test_jwt_key");
        
    } catch (err) {
        if(err) {
            return Promise.reject("Error with token"); 
        }
    };
    console.log(decoded)
    return Promise.resolve(decoded);
}


const Profile = mongoose.model('Scrape', ScrapeSchema);
module.exports = {Scrape};