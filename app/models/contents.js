var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ContentSchema  = new Schema({
    tag: { type: String, required: true },
    subTag: { type: String  },
    createDate: { type: Date, default: Date.now },
    data: Schema.Types.Mixed
});

module.exports  = mongoose.model('Content', ContentSchema);