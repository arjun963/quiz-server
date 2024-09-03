const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new admin user
exports.registerUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			username,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (error) {
		res.status(500).json({ error: "Failed to register user" });
	}
};

exports.createDefaultAdmin = async () => {
	try {
		// Check if an admin user already exists
		const existingAdmin = await User.findOne({ username: "admin" });
		if (existingAdmin) {
			return; // Admin user already exists
		}

		const hashedPassword = await bcrypt.hash("password123", 10); // Default password

		const newAdmin = new User({
			username: "admin",
			password: hashedPassword,
		});

		await newAdmin.save();
		console.log("Default admin user created!");
	} catch (error) {
		console.error("Error creating default admin user:", error);
	}
};

// Login an admin user
exports.loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({ error: "Failed to login" });
	}
};
