const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const VisitorSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: new ObjectId()},
    createdAt: { type: Date, default: Date.now },
    lastSeen: { type: Date, default: Date.now },
    name: { type: String },
    email: { type: String },
    ipv4: {type: String, required: true},
});

module.exports = mongoose.model('Visitor', VisitorSchema);