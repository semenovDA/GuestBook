const Review = require('../models/review.model');
const mongoose = require("mongoose");
const {ResourceExist, ResourceNotFound} = require("../../utils/errors");

exports.getReviewByID = async (review) => {
    return await new Promise((resolve, reject) => {
        Review.findById(review, (err, record) => {
            if (err) return reject(err);
            if (record != null) return resolve(record);
            reject(new ResourceNotFound(`${review} object not found in DB`));
        });
    });
};

exports.getReview = async (review) => {
    return await new Promise((resolve, reject) => {
        Review.findOne(review, (err, record) => {
            if (err) return reject(err);
            if (record != null) return resolve(record);
            reject(new ResourceNotFound(`${review} object not found in DB`));
        });
    });
};

exports.createReview = async (review) => {
    review._id = mongoose.Types.ObjectId(); // generate new id

    return await new Promise(async (resolve, reject) => {
        Review.create(review, (err, record) => { // creating new review
            if (err) return reject(err);
            if (record != null) return resolve(record);
        });
    });
};

exports.getReviews = async () => {
    return await new Promise((resolve, reject) => {
        Review.find({}, (err, records) => {
            if (err) return reject(err);
            resolve(records);
        });
    });
};

exports.findByIdAndUpdate = async (id, value) => {
    return await new Promise((resolve, reject) => {
        Review.findByIdAndUpdate(id, value, function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    });
};