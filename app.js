const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes");
const userRoutes = require("./routes/userRoutes");
const userController = require("./controllers/userController");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(async () => {
		console.log("Connected to MongoDB");

		try {
			await userController.createDefaultAdmin(); // Create default admin user
		} catch (error) {
			console.error("Error creating default admin user:", error);
			process.exit(1); // Exit the process if admin creation fails
		}
	})
	.catch((error) => {
		console.error("MongoDB connection error:", error);
		process.exit(1); // Exit the process if MongoDB connection fails
	});

// Routes
app.use("/api/quizzes", quizRoutes);
app.use("/api/users", userRoutes);

// Start the server
const startServer = async () => {
	try {
		await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (error) {
		console.error("Error starting server:", error);
	}
};

startServer();
