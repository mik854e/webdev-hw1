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

exports.getCustomers = function(agentID, callback) {
	Customer.find({ agentID: agentID }, function(err, customers) {
		callback(customers);
	});
};

exports.updateCustomer = function(customerID, newInfo, callback) {
	var new_firstName = newInfo.firstName;
	var new_lastName = newInfo.lastName;
	var new_phoneNumber =  newInfo.phoneNumber;
	var new_email = newInfo.email;
	Customer.update( 
					{ _id: customerID }, 
					{ $set: 
						{
						firstName: new_firstName,
						lastName: new_lastName,
						phoneNumber: new_phoneNumber,
						email: new_email
						}
					},
					{},
					function(err, customer){
						callback(customer);
					}
				);
};

exports.deleteCustomer = function(customerID, callback) {
	Customer.remove({ _id: customerID }, function(err) {
		callback();
	});
};