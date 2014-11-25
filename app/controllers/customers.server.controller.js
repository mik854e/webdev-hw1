'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	customer_facade = require('./facades/customer_facade.js');

exports.signInCustomer = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var page_num = 1;


	customer_facade.getCustomerByEmail(email, password, function(customer) {
		if (customer) {
			var agentID = customer.agentID;
			var customerID = customer._id.toString();

			var prev_page = '/customers/' + customerID + '#';
			var next_page = '/customers/' + customerID + '?page=2';

			customer_facade.getAgent(agentID, function(agent) {
				customer_facade.getContactHistory(agentID, customerID, page_num, function(contactHistory) {
					res.render('customerhome', {
						agent: agent,
						contactHistory: contactHistory,
						customerID: customerID,
						prev_page: prev_page,
						next_page: next_page
					});
				});
			});
		}
		else {
			res.render('signin');
		}
	});
};

exports.getCustomer = function(req, res) {
	var customerID = req.params.customerID;
	var page_num = req.query.page;
	if (!page_num) page_num = 1;
	else page_num = parseInt(page_num);

	var prev_page;
	if (page_num > 1) prev_page = '/customers/' + customerID + '?page=' + (page_num-1).toString();
	else prev_page = '/customers/' + customerID + '#';

	var next_page = '/customers/' + customerID + '?page=' + (page_num+1).toString();


	customer_facade.getCustomer(customerID, function(customer) {
		var agentID = customer.agentID;
		customer_facade.getAgent(agentID, function(agent) {
			customer_facade.getContactHistory(agentID, customerID, page_num, function(contactHistory) {
				res.render('customerhome', {
					agent: agent,
					contactHistory: contactHistory,
					customerID: customerID,
					prev_page: prev_page,
					next_page: next_page
				});
			});
		});
	});
};

exports.updateAgent = function(req, res) {
	var customerID = req.params.customerID;

	customer_facade.getCustomer(customerID, function(customer) {
		var agentID = customer.agentID;
		customer_facade.getFullContactHistory(agentID, customerID, function(contactHistory) {
			var len = contactHistory.length;
			if (len > 0) {
				var last_time = contactHistory[len-1].timestamp;
				var ms_day = 86400000;
				if (Math.floor((last_time - new Date()) / ms_day) >= 3) {	// At least 72 hours has passed since last contact
					customer_facade.setRandomAgent(customerID, function(agent) {
						res.render('success', {
							msg: 'Your new agent is ' + agent.firstName + ' ' + agent.lastName + '.'
						});
					});
				}
				else {
					res.render('success', {
						msg: 'Cannot assign a new agent if you have had contact with your current agent in the past 72 hours.'
					});
				}
			}
			else if (len === 0) {
				customer_facade.setRandomAgent(customerID, function(agent) {
					res.render('success', {
						msg: 'Your new agent is ' + agent.firstName + ' ' + agent.lastName + '.'
					});
				});
			}
			else {
				res.render('success', {
					msg: 'Cannot assign a new agent if you have had contact with your current agent in the past 72 hours.'
				});
			}
		});
	});

};