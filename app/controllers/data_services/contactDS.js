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

exports.getContactHistory = function(agentID, customerID, limit, skip, callback) {
	Contact.find({ agentID: agentID, customerID: customerID }).limit(limit).skip(skip).exec(function(err, contacts) {
		callback(contacts);
	});
};

exports.getFullContactHistory = function(agentID, customerID, callback) {
	Contact.find({agentID: agentID, customerID: customerID}, function(err, contacts) {
		callback(contacts);
	});
};

exports.updateContact = function(contactID, newInfo) {
	var contact = Contact.update({ _id: contactID }, { $set: newInfo });
};

exports.deleteContact = function(contactID, callback) {
	Contact.remove({ _id: contactID }, function(err) {
		callback();
	});
};