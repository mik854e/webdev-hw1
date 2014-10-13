'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('newsignin', {
		agents : [
			    {
			     firstName: 'Bob',
			     lastName : 'Smith',
			     phoneNumber: '7222342345',
			     email: 'bob@gmail.com'
			    }
			 ]
	});
};

exports.getAgent = function(req, res) {
	res.render('agent', {
		agent : {
				 firstName: 'Bob',
			     lastName : 'Smith',
			     phoneNumber: '7222342345',
			     email: 'bob@gmail.com'
			    },
		customers : [ 
				{
				 firstName: 'Eve',
			     lastName : 'Jackson',
			     phoneNumber: '123-123-4567',
			     email: 'eve@gmail.com',
			     userName: 'eve223'
				}
		]
	});
};

exports.getCustomer = function(req, res) {
	res.render('customer', {
		customer : 
				{
				 firstName: 'Eve',
			     lastName : 'Jackson',
			     phoneNumber: '123-123-4567',
			     email: 'eve@gmail.com',
			     userName: 'eve223'
				}
	});
};

