const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  certification_name: String,
  validupto: Date,
  certification_vendor_name: String,
});
const developerSubmitSchema = new mongoose.Schema({
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
  development_domain: {
    type: String,
    required: true,
  },
  development_tools: {
    type: String,
    required: true,
  },
  industry_experience: {
    type: Number,
    required: true,
  },
  industry_experience_history: {
    type: String,
    required: true,
  },
  certifications: [certificationSchema],
});

const DEVSUB = mongoose.model("Developer", developerSubmitSchema);

module.exports = DEVSUB;
