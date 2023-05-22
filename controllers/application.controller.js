const Application = require("../models/user.applications.schema");
const fs = require("fs");


exports.submitApplication = function (req, res) {
  const { userType, highest_qualification, institution_name, training_domain, training_experience, industry_experience, certifications } = req.body;
  const cvFile = req.files["cv"][0];
  const resumeFile = req.files["resume"][0];

  
  const cvData = fs.readFileSync(cvFile.path, { encoding: "base64" });
  const resumeData = fs.readFileSync(resumeFile.path, { encoding: "base64" });

  // Create the application object
  const application = new Application({
    userType,
    highest_qualification,
    institution_name,
    training_domain,
    training_experience,
    industry_experience,
    cv: cvData, 
    resume: resumeData, 
    certifications
  });

  // Save the application object to the database
  application.save(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving application.");
    } else {
      res.status(200).send("Application submitted successfully.");
    }
  });
};
