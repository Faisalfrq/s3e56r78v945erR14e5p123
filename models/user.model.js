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
      required: true,
    },
  ],
  developer_applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "developers",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
