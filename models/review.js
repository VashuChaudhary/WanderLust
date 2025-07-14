const mongoose = require("mongoose");
const { create } = require("./listing");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	comment: String,
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
