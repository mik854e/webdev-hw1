'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	agent_facade = require('./facades/agent_facade.js');

exports.createCustomer = function(req, res) {
	var agentID = req.params.agentID;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var phoneNumber = req.body.phoneNumber;

	var customerInfo = {
		firstName: firstName,
	    lastName: lastName,
	    phoneNumber: phoneNumber,
	    email: email,
	    agentID: agentID
	};
	
	agent_facade.createCustomer(customerInfo, function(customer) {
		agent_facade.getAgent(agentID, function(agent) {
			agent_facade.getCustomers(agentID, function(customers) {
				res.render('agenthome', {
					agent: agent,
					customers: customers
				});
			});
		});
	});
};

exports.deleteCustomer = function(req, res) {
	var agentID = req.params.agentID;
	var customerID = req.body.customerID;

	agent_facade.deleteCustomer(agentID, customerID, function() {
		res.render('success', {
			msg: 'Customer deleted successfully!'
		});
	});
};

exports.createContact = function(req, res) {
	var agentID = req.params.agentID;
	var customerID = req.params.customerID;

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
		console.log('CREATE');
		console.log(agent);
		res.render('agenthome', {
			agent: agent
		});
	});

};

exports.getAgent = function(req, res) {
	var agentID = req.params.agentID;

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
	agent_facade.getAgents(function(agents) {
		res.render('allagents', {
			agents: agents
		});
	});
};

exports.signinAgent = function(req, res) {
	var email = req.body.email;

	agent_facade.getAgentByEmail(email, function(agent) {
		agent_facade.getCustomers(agent._id.toString(), function(customers) {
			res.render('agenthome', {
				agent: agent,
				customers: customers
			});
		});
	});
};

exports.getCustomer = function(req, res) {
	var agentID = req.params.agentID;
	var customerID = req.params.customerID;

	agent_facade.getCustomer(customerID, function(customer) {
		agent_facade.getContactHistory(agentID, customerID, function(contactHistory) {
			res.render('customer', {
				agentID: agentID,
				customer: customer,
				contactHistory : contactHistory
			});
		});
	});
};

exports.createContact = function(req, res) {
	var agentID = req.params.agentID;
	var customerID = req.params.customerID;
	var contactType = req.body.contactType;
	var summary = req.body.summary;

	var contactInfo = {
		agentID: agentID,
		customerID: customerID,
		contactType: contactType,
		summary: summary,
		timestamp: new Date()
	};

	agent_facade.createContact(contactInfo, function() {
		agent_facade.getCustomer(customerID, function(customer) {
			agent_facade.getContactHistory(agentID, customerID, function(contactHistory) {
				res.render('customer', {
					agentID: agentID,
					customer: customer,
					contactHistory : contactHistory
				});
			});
		});
	});


exports.updateCustomer = function(req, res){
	var agentID = req.params.agentID;
	var customerID = req.params.customerID;

	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var phoneNumber = req.body.phoneNumber;

	var customerInfo = {
		firstName: firstName,
	    lastName: lastName,
	    phoneNumber: phoneNumber,
	    email: email,
	    agentID: agentID
	};
	
	agent_facade.updateCustomer(customerID, customerInfo, function(customer) {
		agent_facade.getAgent(agentID, function(agent) {
			agent_facade.getCustomers(agentID, function(customers) {
				console.log('Update');
				res.render('agenthome', {
					agent: agent,
					customers: customers
				});
			});
		});
	});

	};

exports.updateAgent = function(req, res){
	var agentID = req.params.agentID;
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

	agent_facade.updateAgent(agentID, agentInfo, function(agent) {
		console.log('Update');
		console.log(agent);
		res.render('agenthome', {
			agent: agent
		});
	});

	};	
};