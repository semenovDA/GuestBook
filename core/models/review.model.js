const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const ReviewSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: new ObjectId()},
    createdAt: { type: Date, default: Date.now },
    sender: {type: String, required: true},
    email: {type: String, required: false},
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    likes: { type: Number, required: false, default: 0},
});

module.exports = mongoose.model('Review', ReviewSchema);