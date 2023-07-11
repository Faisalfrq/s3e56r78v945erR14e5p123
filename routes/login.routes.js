const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");
const authenticateToken = require("../controllers/auth.token");

router.get("/signup", loginController.signup);
router.post("/login", loginController.login);
// for Private Profile of User
router.get(
  "/getPrivateProfile",
  authenticateToken,
  loginController.getUserPrivateProfile
);

module.exports = router;
