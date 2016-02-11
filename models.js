
var Mongoose = require('mongoose');


var EquipmentSchema = new Mongoose.Schema({
  // fields are defined here
  "name": String,
  "type": String,
  "usage": String
});

exports.Equipment = Mongoose.model('Equipment', EquipmentSchema);

var EnvironmentSchema = new Mongoose.Schema({
  // fields are defined here
  "name": String,
  "equipment": String,
  "noise": String,
  "type": String
});

exports.Environment = Mongoose.model('Environment', EnvironmentSchema);

var EnvironmentSchema = new Mongoose.Schema({
  // fields are defined here
  "username": {type: String, unique: true},
  "password": {type: String},
  "firstname": String,
  "lastname": String
});

exports.Environment = Mongoose.model('User', EnvironmentSchema);