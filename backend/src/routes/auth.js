const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("../utils/jwt");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User exists" });

    const newUser = new User({ email, password }); // Hash password in production!
    await newUser.save();

    const token = jwt.sign({ id: newUser._id });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  // login logic
});

module.exports = router;
