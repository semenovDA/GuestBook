const mongoose = require('mongoose');
const MongoConfig = require('./config');

let _db;

function connect(url) {
    return mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
}

module.exports = {
    connect: async () => {
        await connect(MongoConfig.uri);
        _db = mongoose.connection;
        return _db;
    },
    db: () => {
        return _db;
    }
};