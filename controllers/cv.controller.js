const db = require("../models/index");
const CV = db.cv;

exports.uploadCV = async (req, res) => {
  try {
    const { resume, expLetter, certifications } = req.files;
    console.log(resume, expLetter, certifications);

    // Create a new CV instance and set the file details
    const cv = new CV({
      resume: {
        data: resume[0].buffer,
        contentType: resume[0].mimetype,
      },
      expLetter: {
        data: expLetter[0].buffer,
        contentType: expLetter[0].mimetype,
      },
      certFile: {
        data: certifications[0].buffer,
        contentType: certifications[0].mimetype,
      },
    });

    const newRecord = await cv.save();

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
