'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	Customer = mongoose.model('Customer');


exports.createCustomer = function(customerInfo, callback) {
	var customer = new Customer(customerInfo);
	customer.save(function(err, customer) {
		callback();
	});
};

exports.getCustomer = function(customerID, callback) {
	Customer.findOne({ _id: customerID }, function(err, customer) {
		callback(customer);
	});
};

exports.getCustomerByEmail = function(email, password, callback) {
	Customer.findOne({ email: email, password: password }, function(err, customer) {
		callback(customer);
	});
};

exports.getCustomers = function(agentID, limit, skip, callback) {
	Customer.find({ agentID: agentID }).limit(limit).skip(skip).exec(function(err, customers) {
		callback(customers);
	});
};

exports.updateCustomer = function(customerID, newInfo, callback) {
	Customer.update( 
			{ _id: customerID }, 
			{ $set: newInfo },
			{},
			function(err, customer) {
				callback(customer);
			}
	);
};

exports.deleteCustomer = function(customerID, callback) {
	Customer.remove({ _id: customerID }, function(err) {
		callback();
	});
};