'use strict';

const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {Profile} = require('./profile');

router.post('/saveImage',function(req, res) {

	let body = _.pick(req.body.userProfile,[ 'userId','imageType','imageUrl','token']); //TODO: Token must be sent via header
	var profile = new Profile({
		userId:body.userId,
		imageType:body.imageType,
		imageUrl:body.imageUrl,
		uploadedDate: new Date()
	});

	profile.checkForValidToken(body.token).then((validToken) => {
		if(validToken._id === "5ec1e099bd1343e81dbcc1e7") { // server ID checking for valid token
			profile.saveUserImage().then((data) => {
				if(data) {
					res.status(200).send();
				} else  {
					res.status(401).send();
				}
			});
		}
	}).catch((err) => {
		res.status(401).send();
		console.log(err)
	});

});

module.exports = router;
