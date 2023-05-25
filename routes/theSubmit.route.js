const express = require("express");
const router = express.Router();
const theSubmitController = require("../controllers/theSubmit.controller");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/trainerUploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/theSubmit",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "expLetter", maxCount: 1 },
    { name: "certFile", maxCount: 1 },
  ]),
  theSubmitController.theSubmit
);

module.exports = router;
