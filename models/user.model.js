const mongoose = require("mongoose");

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    applyAs: String,
    verified: Boolean,
    applications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "applications"
    }]
  });


  const User = mongoose.model("User", userSchema);
  module.exports = User;
  