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
	
	agent_facade.createCustomer(customerInfo, agentID, function(customer) {
		res.render('success', {
			msg: 'Customer created successfully!'
		});
	});
};

exports.deleteCustomer = function(req, res, agentID) {
	customerID = req.body.customerID;

	agent_facade.deleteCustomer(agentID, customerID, function() {
		res.render('success', {
			msg: 'Customer deleted successfully!'
		});
	});
};

exports.createContact = function(req, res, agentID, customerID) {
	var contactType = req.body.contactType;

	agent_facade.createContact(agentID, customerID, contactType, function() {
		res.render('success', {
			msg: 'Contact created successfully!'
		});
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

	agent_facade.createAgent(agentInfo, function(agent) {
		console.log(agent);
		res.render('success', {
			msg: 'Agent created successfully!'
		});
	});

};

exports.getAgent = function(req, res, agentID) {
	agent_facade.getAgent(agentID, function(agent) {
		agent_facade.getCustomers(agentID, function(customers) {
			res.render('agenthome', {
				agent: agent,
				customers: customers
			});
		});
	});
};

exports.getAgents = function(req, res) {
	console.log('get agents called');
	agent_facade.getAgents(function(agents) {
		res.render('allagents', {
			agents: agents
		});
	});

};

exports.getCustomer = function(req, res, agentID, customerID) {
	agent_facade.getCustomer(customerID, function(customer) {
		agent_facade.getContactHistory(agentID, customerID, function(contactHistory) {
			res.render('customer', {
				customer: customer,
				contactHistory : contactHistory
			});
		});
	});
};