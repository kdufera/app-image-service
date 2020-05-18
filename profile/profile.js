'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const ProfileSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true,
        trim: true,
        minlength:6
    },
    socialMediaType: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:10

    },
    socialMediaUrl: {
        type: String,
        required: true,
        minlength:10,
        maxlength:200
    },
    uploadedDate: {
        type: Date,
        required: true,
        maxlength:30

    },
    updatedDate: {
        type: Date,
        required: false,
        maxlength:30

    }
});


ProfileSchema.methods.saveUserSocialMediaInfo = function () {
    var profile = this;
    return profile.save().then((acg) => { //TDOD: based  on user input should update currently stored FB,TW, or IG URL before saving a new record
        if(!acg) {
            return Promise.reject("unable to save user profile");
        } else {
            return Promise.resolve("user profile saved"); 
        }
    });
}


ProfileSchema.methods.checkForValidToken = function (token)  {
    var decoded;
    try {
        decoded = jwt.verify(token,"test_jwt_key");
    } catch (err) {
        if(err) {
            return Promise.reject("Error with token"); 
        }
    };
    return Promise.resolve(decoded);
}


const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = {Profile};