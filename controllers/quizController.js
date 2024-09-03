const Quiz = require("../models/Quiz");
// Create a new quiz
exports.createQuiz = async (req, res) => {
	try {
		console.log(req.body);
		const { questions } = req.body;
		console.log(questions);
		if (questions.lenght > 5)
			return res.json({ message: "question length should we grater then 5" });

		const newQuiz = new Quiz({
			...req.body,
		});

		// Collect validation errors
		const validationErrors = [];

		questions.forEach((question, index) => {
			if (typeof question.correctAnswer !== "number") {
				validationErrors.push(
					`Invalid correctAnswer type for question ${
						index + 1
					}. It should be a number.`
				);
				return res.status(400).json({
					error: "Invalid correctAnswer type. It should be a number.",
				});
			}
		});

		const savedQuiz = await newQuiz.save();
		res.status(201).json(savedQuiz);
	} catch (error) {
		console.error("Failed to create quiz:", error); // Log the error
		if (error.name === "ValidationError") {
			const errors = Object.values(error.errors).map((err) => err.message);
			// Handle validation errors from Mongoose
			return res.status(400).json({ error: error.message });
		}
		res.status(500).json({ error: "Failed to create quiz" });
	}
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
	try {
		const quizzes = await Quiz.find();
		res.status(200).json(quizzes);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch quizzes" });
	}
};

// Get a single quiz by ID
exports.getQuizById = async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
		if (!quiz) {
			return res.status(404).json({ message: "Quiz not found" });
		}
		res.status(200).json(quiz);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch quiz" });
	}
};

// Update a quiz by ID
exports.updateQuiz = async (req, res) => {
	try {
		const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedQuiz) {
			return res.status(404).json({ message: "Quiz not found" });
		}
		res.status(200).json(updatedQuiz);
	} catch (error) {
		res.status(500).json({ error: "Failed to update quiz" });
	}
};

// Delete a quiz by ID
exports.deleteQuiz = async (req, res) => {
	try {
		const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
		if (!deletedQuiz) {
			return res.status(404).json({ message: "Quiz not found" });
		}
		res.status(204).send(); // No content
	} catch (error) {
		res.status(500).json({ error: "Failed to delete quiz" });
	}
};
