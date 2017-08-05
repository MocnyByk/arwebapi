var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var InquirySchema  = new Schema({
    subject: String,
    description: String,
    author: String,
    email: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    markedRead: Boolean
});

module.exports  = mongoose.model('Inquiry', InquirySchema);