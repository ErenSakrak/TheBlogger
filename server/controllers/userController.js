const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if the username is unique
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message:
          "This username is already in use. Please choose a different username.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: hashedPassword });

    await newUser.save();

    res
      .status(201)
      .json({ message: "Registration successful.", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "An error occurred during registration." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Username or password is incorrect!" });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(404)
        .json({ message: "Username or password is incorrect!" });
    }

    // Login successful, return user information
    res.status(200).json({ message: "Login successful.", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
});

router.get("/getUserData", authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userData = await User.findById(req.user._id);

    if (!userData) {
      return res.status(404).json({ message: "User data not found" });
    }

    res.status(200).json({ user: req.user, additionalData: userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
