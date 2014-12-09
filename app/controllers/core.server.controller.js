'use strict';
var _ = require('lodash'),
	mongoose = require('mongoose');

exports.index = function(req, res) {
	res.render('signin', {});
};
