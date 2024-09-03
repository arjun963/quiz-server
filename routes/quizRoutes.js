const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware");

// Apply express.json()
router.use(express.json()); // Parse JSON request body

// Protect all quiz routes with authentication
// router.use(authMiddleware);

// Create a new quiz
router.post("/", quizController.createQuiz);

// Get all quizzes
router.get("/", quizController.getAllQuizzes);

// Get a single quiz by ID
router.get("/:id", quizController.getQuizById);

// Update a quiz by ID
router.put("/:id", quizController.updateQuiz);

// Delete a quiz by ID
router.delete("/:id", quizController.deleteQuiz);

module.exports = router;
