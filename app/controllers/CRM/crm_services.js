'use strict';

var agentDS = require('../data_services/agentDS.js');
var contactDS = require('../data_services/contactDS.js');
var customerDS = require('../data_services/customerDS.js');
var subscriptionDS = require('../data_services/subscriptionDS.js');
var _ = require('lodash'),
	mongoose = require('mongoose'),
	Contact = mongoose.model('Contact'),
	Customer = mongoose.model('Customer'),
	Agent = mongoose.model('Agent');
var amqp = require('amqplib');
var when = require('when');

var OBJ_LIMIT = 5;

// Agent
exports.createAgent = function(agentInfo, callback) {
	agentDS.createAgent(agentInfo, callback);
};

exports.deleteAgent = function(agentID, callback) {
	agentDS.deleteAgent(agentID, function(err) {
		callback();
	});
};

exports.getAgent = function(agentID, callback) {
	agentDS.getAgent(agentID, callback);
};

exports.getRandomAgent = function(callback) {
	agentDS.getRandomAgent(callback);
};

exports.getAgentByEmail = function(email, password, callback) {
	agentDS.getAgentByEmail(email, password, callback);
};

exports.getAgents = function(page_num, callback) {
	var skip = (page_num-1)*OBJ_LIMIT;
	agentDS.getAgents(OBJ_LIMIT, skip, callback);
};

exports.updateAgent = function(agent, newInfo, callback) {
	agentDS.updateAgent(agent, newInfo, callback);
};

// Contact
exports.createContact = function(contactInfo, callback) {
	contactDS.createContact(contactInfo, callback);
};

exports.deleteContact = function(callback) {
	contactDS.deleteContact(function (agent) {
		callback(agent);
	});
};

exports.getContact = function(callback) {
	contactDS.getContact(function(contact) {
		callback(contact);
	});
};

exports.getContactHistory = function(agentID, customerID, page_num, callback) {
	var skip = (page_num-1)*OBJ_LIMIT;
	contactDS.getContactHistory(agentID, customerID, OBJ_LIMIT, skip, callback);
};

exports.getFullContactHistory = function(agentID, customerID, callback) {
	contactDS.getFullContactHistory(agentID, customerID, callback);
};

exports.updateContact = function(contact, newInfo, callback) {
	contactDS.updateContact(function (contact, newInfo) {
		callback(contact, newInfo);
	});
};

exports.deleteContact = function(contactID, callback) {
	contactDS.deleteContact(contactID, function() {
		callback();
	});
};

// Customer
exports.createCustomer = function(customerInfo, callback) {
	customerDS.createCustomer(customerInfo, function(customer) {
		console.log(customer);
		var routingKey = 'crm.customer.id.' + customer.firstName + '.agentid.' +
			customer.agentID + '.zipcode.' + customer.zip + '.created';
		sendMessage(routingKey, 'Customer has been created');
		callback();
	});
};

exports.getCustomerCount = function(agentID, callback){
	customerDS.getCustomerCount(agentID, callback);
};

exports.deleteCustomer = function(customerID, callback) {
	customerDS.deleteCustomer(customerID, function() {
		callback();
	});
};

exports.getCustomer = function(customerID, callback) {
	customerDS.getCustomer(customerID, callback);
};

exports.getCustomerByEmail = function(email, password, callback) {
	customerDS.getCustomerByEmail(email, password, callback);
};

exports.getCustomers = function(agentID, page_num, callback) {
	var skip = (page_num-1)*OBJ_LIMIT;
	customerDS.getCustomers(agentID, OBJ_LIMIT, skip, callback);
};

exports.updateCustomer = function(customerID, newInfo, callback) {
	customerDS.updateCustomer(customerID, newInfo, callback);
};

exports.createSubscription = function(routingKey, agent, callback) {
	subscriptionDS.getSubscription(routingKey, function(subscription) {
		if (subscription == null) {
			subscriptionDS.createSubscription(routingKey, agent, function(subscription) {
				console.log(subscription);
				callback(subscription);
			});
		} else {
			subscriptionDS.updateSubscription(routingKey, agent, function(subscription) {
				callback(subscription);
			});
		}
	});
};

exports.getSubscriptionsForAgent = function(agentID, callback) {
	subscriptionDS.getSubscriptionsForAgent(agentID, callback);
};

var sendMessage = function(routingKey, message) {
	amqp.connect('amqp://localhost').then(function(conn) {
		return when(conn.createChannel().then(function(ch) {
			var ex = 'topic_logs';
			var ok = ch.assertExchange(ex, 'topic', {durable: false});
			return ok.then(function() {
				ch.publish(ex, routingKey, new Buffer(message));
				console.log(" [x] Sent %s:'%s'", routingKey, message);
				return ch.close();
			});
		})).ensure(function() { conn.close(); })
	}).then(null, console.log);
};

exports.getAgentState = function(agentID, callback){
	agentDS.getAgentState(agentID, callback);
};

exports.searchCustomers = function(agentID, query, callback) {
	var regex = new RegExp('.*' + query + '.*', 'i');
	customerDS.searchCustomersByName(agentID, regex, callback);
};
