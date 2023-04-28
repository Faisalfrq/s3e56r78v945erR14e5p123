const mongoose = require("mongoose");

const userVerificationSchema = new mongoose.Schema({
    name: String,
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,
  });

  const UserVerification = mongoose.model("UserVerification", userVerificationSchema);
  module.exports = User;