const fs = require('fs');
const db = require("../models/index");
const CV = db.cv;

const uploadCV = async (req, res) => {
  try {
    const { buffer, originalname } = req.file;
    const path = `uploads/${originalname}`;

    // Save the file to the server
    fs.writeFileSync(path, buffer);

    // Save the CV details to the database
    const cv = new CV({ filename: originalname, path });
    await cv.save();

    res.status(200).json({ message: 'CV uploaded successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload CV.' });
  }
};

module.exports = {
  uploadCV,
};
