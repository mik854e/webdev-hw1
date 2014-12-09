var _ = require('lodash'),
    mongoose = require('mongoose'),
    crm_services = require('../CRM/crm_services.js');

exports.createSubscription = function(routingKey, agent, callback) {
    crm_services.createSubscription(routingKey, agent, function(subscription) {
        callback(subscription);
    });
};

exports.notify = function(routingKey, data, callback) {
    crm_services.notify(routingKey, function(subscription) {
        callback(subscription);
    });
};

exports.getSubscriptionsForAgent = function(agentID, callback) {
    crm_services.getSubscriptionsForAgent(agentID, callback);
};
