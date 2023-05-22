
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Specify the destination directory for storing the files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Set the file name as the current timestamp + original file name
//   },
// });
// const fileFilter = function (req, file, cb) {
//   if (
//     file.mimetype === "application/pdf" || // Modify the file MIME types based on your requirements
//     file.mimetype === "application/msword" ||
//     file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   ) {
//     cb(null, true); // Accept the file
//   } else {
//     cb(new Error("Invalid file type."), false); // Reject the file
//   }
// };

const mongoose = require("mongoose");
const certificationSchema = new mongoose.Schema({
    certification_name: String,
    validupto: Date,
    certification_vendor_name: String
  });


const applicationSchema = new mongoose.Schema({
    userType:String,
    highest_qualification: String,
    institution_name: String,
    training_domain: String,
    training_experience: Number,
    industry_experience: String,
    cv:Buffer,
    resume:Buffer,
    certifications: [certificationSchema]
  });

  const Application = mongoose.model("applications", applicationSchema);
  module.exports = Application;