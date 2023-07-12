const express = require("express");
const router = express.Router();
const developmentSubmitController = require("../controllers/developerSubmit.controller");
const authenticateToken = require("../controllers/auth.token");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/developerUploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/developerSubmit",
  authenticateToken,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "expLetter", maxCount: 1 },
    { name: "certFile", maxCount: 1 },
  ]),
  developmentSubmitController.developerSubmit
);

module.exports = router;
