'use strict';
var _ = require('lodash'),
    mongoose = require('mongoose'),
    subscription_facade = require('./facades/subscription_facade.js');
var amqp = require('amqplib');
var when = require('when');

exports.createSubscription = function(req, res) {
    var agent = req.body.agent;
    var routingKey = req.body.routingKey;
    subscription_facade.createSubscription(routingKey, agent, function(subscription) {
        console.log('subscription created');
        sendMessage(routingKey, 'created');
        res.send(200);
    });
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

exports.notify = function(req, res) {
    var data = req.body.data;
    var routingKey = req.body.routingKey;
    console.log('in notify');

    subscription_facade.notify(routingKey, data, function(subscription) {
        var agents = subscription.agents;
        console.log('notified all subscriptions of routing key: ' + routingKey);
        console.log(agents);
        res.send(200);
    });
};

exports.getSubscriptionsForAgent = function(req, res) {
    var agentID = req.params.agentID;
    subscription_facade.getSubscriptionsForAgent(agentID, function(subscriptions) {
        console.log(subscriptions);
        res.json(subscriptions);
    });
};
