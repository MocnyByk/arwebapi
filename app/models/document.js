var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var DocumentSchema  = new Schema({
    title : String, 
    description : String,
    docType: String,
    mimeType: String, 
    docUrl: { type: String, required: true }, 
    thumbnailUrl: String, 
    createDate: { type: Date, default: Date.now }, 
    createMember: { type: String, required: true },
    height: Number,
    width: Number,
    folder: String
});

DocumentSchema.on('init', function(model) {
    console.log('document: init');
});

module.exports  = mongoose.model('Document', DocumentSchema);