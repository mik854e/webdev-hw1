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

exports.getCustomerByEmail = function(email, callback) {
	Customer.findOne({ email: email }, function(err, customer) {
		callback(customer);
	});
};

exports.getCustomers = function(agentID, callback) {
	Customer.find({ agentID: agentID }, function(err, customers) {
		callback(customers);
	});
};

exports.updateCustomer = function(customerID, newInfo) {
	var customer = Customer.update(
		{ _id: customerID }, 
		{ $set: newInfo }
		);
};

exports.deleteCustomer = function(customerID) {
	Customer.delete({ _id: customerID });
};