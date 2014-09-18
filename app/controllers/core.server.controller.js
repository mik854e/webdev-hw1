'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		agents : [
			    {firstName: 'Bob',
			     lastName : 'Smith',
			     phoneNumber: '7222342345',
			     email: 'bob@gmail.com'
			    }
			 ]
	});
};

exports.getAgent = function(req, res) {
	res.render('agents', {
		agent :     {firstName: 'Bob',
			     lastName : 'Smith',
			     phoneNumber: '7222342345',
			     email: 'bob@gmail.com'
			    }
	});
};

