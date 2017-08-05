var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var Size  = new Schema({
    width: Number,
    height: Number
});

var VisitDataSchema  = new Schema({
    ipAddress: { type: String, required: true },
    browser: { type: String, required: true },
    countryCode: String,
    countryName: String,
    city: String,
    screenSize: Size,
    createDate: { type: Date, default: Date.now }
});

module.exports  = mongoose.model('VisitData', VisitDataSchema);