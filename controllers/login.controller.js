const db = require("../models/index");
const User = db.user
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const bcrypt = require('bcryptjs')


exports.signup = async (req, res) => {
  const { name, email, password, phone, applyAs } = req.body; // get user details from request body

  try {
    const existingUser = await User.findOne({ email }); // check if user with email exists in database

    if (existingUser) { // if user exists, send error response
      return res.status(400).json({ error: 'Email already in use' });
    }

    const newUser = new User({ // create new user object
      name,
      email,
      password,
      phone,
      applyAs
    });

    await newUser.save(); // save new user to database

    return res.status(201).json({ message: 'User created successfully' }); // send success response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' }); // send server error response
  }
}



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
