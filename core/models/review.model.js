const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const ReviewSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: new ObjectId()},
    createdAt: { type: Date, default: Date.now },
    name: {type: String },
    sender: {type: mongoose.Schema.Types.ObjectId, required: true},
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    likes: { type: Number, default: 0},
});

module.exports = mongoose.model('Review', ReviewSchema);