'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	Contact = mongoose.model('Contact');


exports.createContact = function(contactInfo, callback) {
	var contact = new Contact(contactInfo);
	contact.save(function(err, contact) {
		callback();
	});
};


exports.getContactHistory = function(agentID, customerID, callback) {
	Contact.find({agentID: agentID, customerID: customerID}, function(err, contacts) {
		callback(contacts);
	});
};


exports.updateContact = function(contactID, newInfo) {
	var contact = Contact.update({ _id: contactID }, { $set: newInfo });
};


exports.deleteContact = function(contactID) {
	Contact.delete({ _id: contactID });
};