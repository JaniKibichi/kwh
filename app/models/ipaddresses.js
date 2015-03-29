//the IP address model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IPSchema = new Schema ({
	ip : String,
	reg_date : {type: Date, default : Date.now}
});

module.exports = mongoose.model('IP', IPSchema);
