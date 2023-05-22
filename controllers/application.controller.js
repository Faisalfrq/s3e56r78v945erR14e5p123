const db = require("../models/index");
const Application = db.application;

exports.submitApplication = async function (req, res) {
  const {
    userType,
    highest_qualification,
    institution_name,
    training_domain,
    training_experience,
    industry_experience,
    certifications,
  } = req.body;

  const application = new Application({
    userType,
    highest_qualification,
    institution_name,
    training_domain,
    training_experience,
    industry_experience,
    certifications,
  });

  try {
    await application.save();
    res.status(200).send("Application submitted successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving application.");
  }
};
