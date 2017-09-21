"use strict"
var mongoose = require('mongoose');

var itemsSchema = mongoose.Schema({
	title: String,
	description: String,
	images: String,
	price: Number
});

var Items = mongoose.model('Items', itemsSchema);
module.exports = Items;