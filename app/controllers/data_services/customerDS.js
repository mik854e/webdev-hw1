'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	Customer = mongoose.model('Customer');


exports.createCustomer = function(customerInfo, callback) {
	var customer = new Customer(customerInfo);
	customer.save(function(err, customer) {
		callback(customer);
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

exports.getCustomers = function(limit, skip, params, callback) {
	Customer.find(params).limit(limit).skip(skip).exec(function(err, customers) {
		callback(customers);
	});
};

exports.getCustomerCount = function (agentID, callback) {
	Customer.count( {agentID: agentID}, function(err, customers) {
		callback(customers);
	});
};

exports.searchCustomers = function(agentID, callback) {
	Customer.find({ agentID: agentID }).exec(function(err, customers) {
		callback(customers);
	});
};

exports.searchCustomersByName = function(agentID, query, callback) {
	Customer.find({ agentID: agentID, $or: [{firstName: {$regex: query}}, {lastName: {$regex: query}}] }).exec(function(err, customers) {
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
