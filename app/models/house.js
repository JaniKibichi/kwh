//the house model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HouseSchema = new Schema({
	name : String,
	estate : String,
	rooms : Number,
	kitchenCT : Number,
	lightsCT : Number,
	socketsCT : Number,
	showerCT: Number,
	reg_date : {type: Date, default: Date.now},
	simNo : Number 
});

module.exports = mongoose.model('House', HouseSchema);
