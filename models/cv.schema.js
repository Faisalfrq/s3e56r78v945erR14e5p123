const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const CV = mongoose.model('CV', cvSchema);

module.exports = CV;
