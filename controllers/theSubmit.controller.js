const db = require("../models/index");
const SUB = db.sub;

exports.theSubmit = async (req, res) => {
  try {
    const { resume, expLetter, certFile } = req.files;

    const certifications = [];
    let index = 0;
    while (req.body[`certification_name_${index}`]) {
      const certification = {
        certification_name: req.body[`certification_name_${index}`],
        validupto: req.body[`validupto_${index}`],
        certification_vendor_name:
          req.body[`certification_vendor_name_${index}`],
      };
      certifications.push(certification);
      index++;
    }

    // Validate required fields
    if (!req.body.highest_qualification) {
      throw new Error("Highest Qualification is required.");
    }
    if (!req.body.highest_qualification_year) {
      throw new Error("Year of Highest Qualification is required.");
    }
    if (!req.body.institution_name) {
      throw new Error("Institution Name is required.");
    }
    if (!req.body.training_domain) {
      throw new Error("Training Domain is required.");
    }
    if (!req.body.training_domain_subcategory) {
      throw new Error("Training Domain Subcategory is required.");
    }
    if (!req.body.training_experience) {
      throw new Error("Training Experience is required.");
    }
    if (!req.body.industry_experience) {
      throw new Error("Industry Experience is required.");
    }
    if (!req.files || !req.files.resume) {
      throw new Error("Resume file is required.");
    }
    if (!req.files || !req.files.expLetter) {
      throw new Error("Experience Letter file is required.");
    }
    if (!req.files || !req.files.certFile) {
      throw new Error("Certification file is required.");
    }

    // Validate certifications array
    if (certifications.length === 0) {
      throw new Error("At least one certification is required.");
    }

    for (let i = 0; i < certifications.length; i++) {
      const certification = certifications[i];
      if (!certification.certification_name) {
        throw new Error(
          `Certification Name is required for certification ${i + 1}.`
        );
      }
      if (!certification.validupto) {
        throw new Error(`Valid Upto is required for certification ${i + 1}.`);
      }
      if (!certification.certification_vendor_name) {
        throw new Error(
          `Certification Vendor Name is required for certification ${i + 1}.`
        );
      }
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
      // userType: req.body.userType,
      highest_qualification: req.body.highest_qualification,
      highest_qualification_year: req.body.highest_qualification_year,
      institution_name: req.body.institution_name,
      training_domain: req.body.training_domain,
      training_domain_subcategory: req.body.training_domain_subcategory,
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
      message: err.message || "Unable to upload file",
    });
  }
};
