'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubscriptionSchema = new Schema({
    agents: [Schema.ObjectId],
    routingKey: String
});

mongoose.model('Subscription', SubscriptionSchema);
