'use strict';

module.exports = function(app) {
    var subscriptions = require('../../app/controllers/subscriptions');

    app.route('/subscriptions/create').post(subscriptions.createSubscription);
    app.route('/subscriptions/notify').post(subscriptions.notify);
    app.route('/subscriptions/:agentID').get(subscriptions.getSubscriptionsForAgent);

    // app.route('/agents/:name').get(core.getAgent);
    //app.route('/customers/:name').get(core.getCustomer);

};
