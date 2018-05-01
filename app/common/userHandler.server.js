'use strict';
//never used this file !!!!!!!!!
var Users = require('../models/users.js');

function userHandler () {

	this.getUsers = function (req, res) {
		Users
			.findOne({ 'facebook.id': req.user.facebook.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

                res.json(facebook.displayName);
                res.json(facebook.id);
			});
	};

}
module.exports = userHandler;