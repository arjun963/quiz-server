const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	questions: [
		{
			text: {
				type: String,
				required: true,
			},
			options: [
				{
					type: String,
					required: true,
				},
			],
			correctAnswer: {
				type: Number, // Index of the correct answer in the options array
				required: false,
			},
		},
	],
});

module.exports = mongoose.model("Quiz", quizSchema);
