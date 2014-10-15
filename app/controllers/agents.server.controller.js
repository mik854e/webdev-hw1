'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	agent_facade = require('./facades/agent_facade.js');

exports.createCustomer = function(req, res, agentID) {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var phoneNumber = req.body.phoneNumber;

	var customerInfo = {
		firstName: firstName,
	    lastName: lastName,
	    phoneNumber: phoneNumber,
	    email: email
	};
	
	agent_facade.createCustomer(customerInfo, agentID);

	res.render('success', {
		msg: 'success'
	});
};

exports.deleteCustomer = function(req, res, agentID) {
	customerID = req.body.customerID;
	agent_facade.deleteCustomer(agentID, customerID);
};

exports.createContact = function(req, res, agentID) {
	var contactType = req.body.contactType;
	var customerID = req.body.customerID;

	agent_facade.createContact(agentID, customerID, contactType);

	res.render('success', {
		msg: 'success'
	});
};

exports.createAgent = function(req, res) {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var phoneNumber = req.body.phoneNumber;

	var agentInfo = {
		firstName: firstName,
	    lastName: lastName,
	    phoneNumber: phoneNumber,
	    email: email
	};

	agent_facade.createAgent(agentInfo);

	res.render('success', {
		msg: 'success'
	});
};

exports.getAgent = function(req, res, agentID) {
	var agent = agent_facade.getAgent(agentID);
	var customers = agent_facade.getCustomers(agentID);

	res.render('agenthome', {
		agent: agent,
		customers: customers
	});
};

exports.getCustomer = function(req, res, agentID, customerID) {
	var customer = agent_facade.getCustomer(customerID);
	var contactHistory = agent_facade.getContactHistory(agentID, customerID);

	res.render('customer', {
		customer: customer,
		contactHistory : contactHistory
	});
};