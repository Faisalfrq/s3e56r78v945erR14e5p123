const express = require("express");
const router = express.Router();

const userContoller = require("../controllers/user.controller");

//for Test
// router.get('/test', userContoller.test);
//for adminpanel getALL
router.get("/getAllUsers", userContoller.getAllUsers);
//for login
router.get("/getOneUser/:id", userContoller.getOneUser);
//for signup
router.post("/addUsers", userContoller.addUsers); //============= USED FOR SIGNUP ============
//for update
router.put("/updateUser/:id", userContoller.updateUser);
//for delete account
router.delete("/deleteUser/:id", userContoller.deleteUser);
// for email verification
router.get("/verify", userContoller.verifyEmail);

module.exports = router;
