const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  resume: {
    data: Buffer,
    contentType: String,
  },
  expLetter: {
    data: Buffer,
    contentType: String,
  },
  certFile: {
    data: Buffer,
    contentType: String,
  },
});

const CV = mongoose.model("CV", cvSchema);

module.exports = CV;
