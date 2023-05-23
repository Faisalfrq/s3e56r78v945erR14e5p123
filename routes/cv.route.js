const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cv.controller");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/uploadCV",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "expLetter", maxCount: 1 },
    { name: "certFile", maxCount: 1 },
  ]),
  cvController.uploadCV
);

module.exports = router;
