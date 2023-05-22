const mongoose = require("mongoose");
const certificationSchema = new mongoose.Schema({
    certification_name: String,
    validupto: Date,
    certification_vendor_name: String
  });


  const applicationSchema = new mongoose.Schema({
    userType: String,
    highest_qualification: String,
    institution_name: String,
    training_domain: String,
    training_experience: Number,
    industry_experience: String,
    certifications: [certificationSchema],
  });
  
  const Application = mongoose.model("applications", applicationSchema);
  module.exports = Application;
  