const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  file: {
    data: Buffer,
    contentType: String,
  },
});

const CV = mongoose.model("CV", cvSchema);

module.exports = CV;
