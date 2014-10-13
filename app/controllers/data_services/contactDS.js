'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	Contact = mongoose.model('Contact');


exports.createContact = function(contact) {
	var new_contact = new Contact(contact);
	new_contact.save(function(err) {
		//throw exception
	});
};


exports.getContact = function(contactID) {
	Contact.find({ _id: contactID }, function(err, contact) {
		return contact;
	});
};


exports.updateContact = function(contactID, newInfo) {
	var contact = Contact.update({ _id: contactID }, { $set: newInfo });
};


exports.deleteContact = function(contactID) {
	Contact.delete({ _id: contactID });
};