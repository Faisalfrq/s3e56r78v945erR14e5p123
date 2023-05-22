const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/application.controller");
const multer = require("multer");

// Create the multer middleware
const upload = multer();

// Route for submitting an application
router.post("/submit-application", upload.fields([{ name: "cv" }, { name: "resume" }]), applicationController.submitApplication);

module.exports = router;
