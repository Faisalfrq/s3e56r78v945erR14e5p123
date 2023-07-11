const mongoose = require("mongoose");
const User = require("./user.model");
const Trainer = require("./submit.schema");
const DEVSUB = require("./developerSubmit.schema");

const db = {};

db.mongoose = mongoose;
db.user = User;
db.sub = Trainer;
db.devsub = DEVSUB;

module.exports = db;
