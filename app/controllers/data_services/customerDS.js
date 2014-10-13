'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	Customer = mongoose.model('Customer');


exports.createCustomer = function(customer) {
	var new_customer = new Customer(customer);
	new_customer.save(function(err) {
		//throw exception
	});
};


exports.getCustomer = function(customerID) {
	Customer.find({ _id: customerID }, function(err, customer) {
		return customer;
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