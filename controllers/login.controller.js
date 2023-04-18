const db = require("../models/index");
const User = db.user
// const tokenList = {}
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const bcrypt = require('bcryptjs')

// exports.signup = async (req, res) => {
//     const { name, email, password, phone, applyAs, DevSub, TrainerSub} = req.body
//     try {
//         const existingUser = await User.findOne({ email: email })
//         if (existingUser.email) {
//             return res.status(400).send({
//                 status: "error",
//                 message: "email already exists"
//             })
//         }
//         //const hashedPassword = await bcrypt.hash(password, 10)
//         const result = await db.create({
//             name: name,
//             email: email,
//             password: password,
//             phone: phone,
//             applyAs: applyAs
//         })

//         const token = jwt.sign({ email: result.email, id: result.id }, config.secret)

//         res.status(201).json({
//             user: result,
//             token: token
//         })
//     } catch (err) {
//         return res.status(500).send({
//             status: "error",
//             message: "something went wrong, please try again later"
//         })
//     }

// }


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUsers = await User.findOne({ email: email });
    if (!existingUsers) {
      return res.status(404).json({ message: "User not found" });
    } else if (existingUsers.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    } else {
      const token = jwt.sign(
        { email: existingUsers.email, id: existingUsers._id },
        config.secret
      );

      res.status(201).json({
        token: token,
        user: existingUsers,
      });
    }
  } catch (err) {
    console.log("something went wrong: " + err.message);
  }
};
