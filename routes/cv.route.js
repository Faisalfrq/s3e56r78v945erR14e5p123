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

router.post("/uploadCV", upload.single("file"), cvController.uploadCV);

module.exports = router;
