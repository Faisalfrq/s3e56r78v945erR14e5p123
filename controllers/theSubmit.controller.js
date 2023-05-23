const db = require("../models/index");
const SUB = db.sub;

exports.theSubmit = async (req, res) => {
  try {
    const { resume, expLetter, certFile } = req.files;

    const certifications = [];
    for (let i = 0; i < req.body.certifications.length; i++) {
      const certification = {
        certification_name: req.body.certifications[i].certification_name,
        validupto: req.body.certifications[i].validupto,
        certification_vendor_name:
          req.body.certifications[i].certification_vendor_name,
      };
      certifications.push(certification);
    }

    const sub = new SUB({
      resume: {
        data: resume[0].buffer,
        contentType: resume[0].mimetype,
      },
      expLetter: {
        data: expLetter[0].buffer,
        contentType: expLetter[0].mimetype,
      },
      certFile: {
        data: certFile[0].buffer,
        contentType: certFile[0].mimetype,
      },
      userType: req.body.userType,
      highest_qualification: req.body.highest_qualification,
      institution_name: req.body.institution_name,
      training_domain: req.body.training_domain,
      training_experience: req.body.training_experience,
      industry_experience: req.body.industry_experience,
      certifications: certifications,
    });

    const newRecord = await sub.save();

    return res.send({
      status: "Success",
      data: newRecord,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      status: "error",
      message: "Unable to upload file",
    });
  }
};
