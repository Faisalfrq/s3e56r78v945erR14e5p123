const mongoose = require("mongoose");
const User = require("./user.model");
const SUB = require("./submit.schema");
const DEVSUB = require("./developerSubmit.schema");
// const UserVerification = require("./user.verification.schema")
// const nodemailer = require("nodemailer");
// const {v4: uuidv4}= require("uuid")

const db = {};

db.mongoose = mongoose;
db.user = User;
db.sub = SUB;
db.devsub = DEVSUB;

module.exports = db;
