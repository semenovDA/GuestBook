const Visitor = require('../models/visitor.model');
const mongoose = require("mongoose");
const {ResourceExist, ResourceNotFound} = require("../../utils/errors");

exports.getVisitorByID = async (visitor) => {
    return await new Promise((resolve, reject) => {
        Visitor.findById(visitor, (err, record) => {
            if (err) return reject(err);
            if (record != null) return resolve(record);
            reject(new ResourceNotFound(`${visitor} object not found in DB`));
        });
    });
};

exports.getVisitor = async (visitor) => {
    return await new Promise((resolve, reject) => {
        Visitor.findOne(visitor, (err, record) => {
            if (err) return reject(err);
            if (record != null) return resolve(record);
            reject(new ResourceNotFound(`${visitor} object not found in DB`));
        });
    });
};

exports.createVisitor = async (visitor) => {
    visitor._id = mongoose.Types.ObjectId(); // generate new id
    console.log(visitor);
    return await new Promise(async (resolve, reject) => {
        Visitor.create(visitor, (err, record) => { // creating new Visitor
            if (err) return reject(err);
            if (record != null) return resolve(record);
        });
    });
};

exports.getVisitors = async () => {
    return await new Promise((resolve, reject) => {
        Visitor.find({}, (err, records) => {
            if (err) return reject(err);
            resolve(records);
        });
    });
};

exports.findByIdAndUpdate = async (id, value) => {
    return await new Promise((resolve, reject) => {
        Visitor.findByIdAndUpdate(id, value, function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    });
};