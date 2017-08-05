var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var WebsiteConfigSchema  = new Schema({
    visitCount: { type: Number, default: 0, min: 0},
    visitCountLastUpdated: Date
});

module.exports  = mongoose.model('WebsiteConfig', WebsiteConfigSchema);