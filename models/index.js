const mongoose = require("mongoose");
const User = require ("./user.model");
const Application = require("./user.applications.schema")
// const UserVerification = require("./user.verification.schema")
// const nodemailer = require("nodemailer");
// const {v4: uuidv4}= require("uuid")

const db = {};

db.mongoose = mongoose;
db.user = User;
db.application = Application

module.exports = db;