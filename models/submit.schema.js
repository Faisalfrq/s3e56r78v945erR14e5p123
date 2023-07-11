const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  certification_name: String,
  validupto: Date,
  certification_vendor_name: String,
});
const submitSchema = new mongoose.Schema({
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
  // userType: {
  //   type: String,
  //   required: true,
  // },
  highest_qualification: {
    type: String,
    required: true,
  },
  highest_qualification_year: {
    type: Number,
    required: true,
  },
  institution_name: {
    type: String,
    required: true,
  },
  training_domain: {
    type: [String],
    required: true,
  },
  training_domain_subcategory: {
    type: [String],
    required: true,
  },
  training_experience: {
    type: Number,
    required: true,
  },
  industry_experience: {
    type: Number,
    required: true,
  },
  certifications: [certificationSchema],
});

const Trainer = mongoose.model("Trainer", submitSchema);

module.exports = Trainer;
