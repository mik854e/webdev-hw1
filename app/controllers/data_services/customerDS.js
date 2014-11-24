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
		console.log('getCusteomr: ' + customer);
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
	var new_street = newInfo.street;
	var new_city = newInfo.city;
	var new_zip = newInfo.zip;
	var new_state = newInfo.state;
	Customer.update( 
					{ _id: customerID }, 
					{ $set: 
						{
						firstName: new_firstName,
						lastName: new_lastName,
						phoneNumber: new_phoneNumber,
						email: new_email,
						street: new_street,
						city: new_city,
						zip: new_zip,
						state: new_state
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