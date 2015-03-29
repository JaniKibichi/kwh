//the usage model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsageSchema = new Schema({
	kitchenKWH : Number,
	lightsKWH : Number,
	socketsKWH : Number,
	showerKWH : Number,
	dateIn : {type: Date, default: Date.now},
	simNo : Number
});

module.exports = mongoose.model('Usage', UsageSchema);
