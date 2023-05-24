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
    const newRecord = await application.save();
    res.status(200).send({ message: "Application submitted successfully.", data: newRecord });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error saving application." });
  }
};
