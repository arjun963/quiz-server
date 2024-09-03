const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Register a new admin user
router.post("/register", userController.registerUser);

// Login an admin user
router.post("/login", userController.loginUser);

module.exports = router;
