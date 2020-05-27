var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var options = {
    "timestamps": {
        "createdAt": "createdDate",
        "updatedAt": "updateDate",
    }
}

var contact = new Schema({
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    workplace: { type: String },
    createdDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
    
}, options);

module.exports = contact;