const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
  applyAs: String,
  verificationToken: String, // Add the verificationToken field
  verified: {
    type: Boolean,
    default: false, // Set the default value of verified to false
  },
  trainer_applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
    },
  ],
  developer_applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Developer",
    },
  ],
  cv: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cvs",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
