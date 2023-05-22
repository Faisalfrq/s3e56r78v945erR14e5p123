const db = require("../models/index");
const User = db.user

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
        const user = new User({
            name: name,
            email: email,
            password: password,
            phone: phone,
            applyAs: applyAs
        });
        const newRecord = await user.save();
        return res.send({
            status: "Success",
            message:"New Record Created",
            data: newRecord,
        });
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "Unable to Add User to database",
        });
    }
};

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
      console.log("------------------------")
      console.log(user)
      console.log(id)
      console.log(applicationId)
      return res.status(200).json({ message: "Application added to user successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  exports.getApplications = async (req, res) => {
    const { id } = req.params
    const foundApplications = await User.findById(id).populate("applications");
    res.send({
      status: "Success",
      data: foundApplications
    })
  }
