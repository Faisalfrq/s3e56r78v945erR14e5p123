const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/application.controller");



// Route for submitting an application
router.post("/submitApplication", applicationController.submitApplication);

module.exports = router;
