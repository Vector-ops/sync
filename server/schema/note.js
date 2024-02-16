const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new Schema(
	{
		author_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		author: {
			type: String,
			required: true,
			trim: true,
		},
		institution_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Institution",
		},
		title: {
			type: String,
			required: [true, "must provide title"],
			trim: true,
		},
		body: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Note", notesSchema);
