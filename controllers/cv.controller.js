const db = require("../models/index");
const CV = db.cv;

exports.uploadCV = async (req, res) => {
  try {
    const file = req.file;
    console.log(file);

    // Create a new CV instance and set the file details
    const cv = new CV({
      file: {
        data: file.buffer,
        contentType: file.mimetype,
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