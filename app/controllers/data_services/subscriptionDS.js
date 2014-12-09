'use strict';

var _ = require('lodash'),
    mongoose = require('mongoose'),
    Subscription = mongoose.model('Subscription');

exports.getSubscription = function(routingKey, callback) {
    Subscription.findOne({routingKey: routingKey}, function(err, subscription) {
        console.log(err);
        console.log(subscription);
        callback(err, subscription);
    });
};

exports.createSubscription = function(routingKey, agent, callback) {
    var id = mongoose.Types.ObjectId();
    var newSubscription = new Subscription({routingKey: routingKey, agents: [id]});
    console.log(newSubscription);
    newSubscription.save(function(err, subscription) {
        console.log(err);
        console.log('created subscription');
        console.log(subscription);
        callback(subscription);
    });
};

exports.updateSubscription = function(routingKey, agent, callback) {
    Subscription.findOneAndUpdate({ routingKey: routingKey}, {$push: {'agents': agent}},
        function(err, subscription) {
            callback(subscription);
    });
};

exports.getSubscriptions = function(routingKey, callback) {
    Subscription.find({ routingKey: routingKey }, function(err, subscription) {
        callback(err, subscription);
    });
};

exports.getSubscriptionsForAgent = function(agentID, callback) {
    Subscription.find({agents: agentID}, 'routingKey', function(err, subscriptions) {
        callback(subscriptions);
    });
};
