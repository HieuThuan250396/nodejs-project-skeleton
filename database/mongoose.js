const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbName = process.env.DBNAME;
const dbHost = process.env.DBHOST || 'localhost';
const dbPort = process.env.DBPORT || '27017';
const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const connect = mongoose.connect(dbUrl, { useNewUrlParser: true });
module.exports = connect;
