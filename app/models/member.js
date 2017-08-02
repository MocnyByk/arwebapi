var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var loginTokenSchema = new Schema({
    token: { type: String, required: true },
    lastUse: { type: Date, default: Date.now }
});

var MemberSchema  = new Schema({
    memberCode: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    salt: { type: String, required: true},
    createDate: { type: Date, default: Date.now },
    lastActivity: { type: Date, default: Date.now },
    lastFailedLogin: { type: Date, default: Date.now },
    failedLoginAttempts: { type: Number, default: 0 },
    locked: { type: Boolean, default: false },
    loginTokens: [loginTokenSchema]
});

module.exports = mongoose.model('Member', MemberSchema);