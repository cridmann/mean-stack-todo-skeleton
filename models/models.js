var Mongoose = require('mongoose');
var config = require('../lib/config.js').config;
var db = Mongoose.createConnection(config.mongodb.host, config.mongodb.dbname);

var TodoSchema = require('./TodoSchema.js').TodoSchema;
var Todo = db.model('todos', TodoSchema);

var UserSchema = require('./UserSchema.js').UserSchema;
var User = db.model('users', UserSchema);

module.exports.Todo = Todo;
exports.User = User;
exports.db = db;
exports.Mongoose = Mongoose;

