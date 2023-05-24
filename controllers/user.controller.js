const db = require("../models/index");
const User = db.user;

const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Configure the email sending service
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ae98549305461d",
    pass: "144f033acd00c9",
  },
});

exports.addUsers = async (req, res) => {
  try {
    const { name, email, password, phone, applyAs } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Account already exists");
      return res.status(400).send({
        status: "error",
        message: "Account already exists",
      });
    }

    const verificationToken = crypto.randomBytes(20).toString("hex");

    const user = new User({
      name: name,
      email: email,
      password: password,
      phone: phone,
      applyAs: applyAs,
      verificationToken: verificationToken,
    });

    const newRecord = await user.save();

    // Send the verification email to the user
    const verificationLink = `https://pietechserver-dev.onrender.com/verify?token=${verificationToken}`;

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Please click the following link to verify your email: ${verificationLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res.send({
      status: "Success",
      message: "New Record Created",
      data: newRecord,
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "Unable to Add User to database",
    });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "Invalid verification token",
      });
    }

    user.verified = true;
    user.verificationToken = undefined; // Clear the verification token
    await user.save();

    return res.send({
      status: "success",
      message: "Email verified successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "Unable to verify email",
    });
  }
};
// Rest of the code remains the same...

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }
    return res.send({
      status: "Success",
      data: user,
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "Unable to fetch User from database",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.phone = phone || user.phone;

    const updatedUser = await user.save();

    return res.send({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Unable to update user",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params; // get the user ID from the request parameters

  try {
    const user = await User.findByIdAndDelete(id); // find and delete the user by ID

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    return res.send({
      status: "success",
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Unable to delete user",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // find all users

    return res.send({
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Unable to retrieve users",
      error: error.message,
    });
  }
};

//-------------Use to add Application in USERS-----------
exports.addApplicationToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicationId } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { $push: { applications: applicationId } },
      { new: true } // To get the updated user document as the result
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("------------------------");
    console.log(user);
    console.log(id);
    console.log(applicationId);
    return res
      .status(200)
      .json({ message: "Application added to user successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getApplications = async (req, res) => {
  const { id } = req.params;
  const foundApplications = await User.findById(id).populate("applications");
  res.send({
    status: "Success",
    data: foundApplications,
  });
};
//=============-----Upload C----------==========================
// Add CV to User
exports.addCVToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { cvId } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { cv: cvId },
      { new: true } // To get the updated user document as the result
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    return res.status(200).json({ message: "CV added to user successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// Get User's CV
exports.getCV = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("cv");
  
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.send({
    status: "Success",
    data: user.cv,
  });
};

