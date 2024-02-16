const mongoose = require("mongoose");
const { Schema } = mongoose;

const institutionSchema = new Schema({
	name: {
		type: String,
		required: [true, "must provide institution name"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "must provide email"],
		trim: true,
		unique: true,
		lowercase: true,
	},
});

module.exports = mongoose.model("Institution", institutionSchema);
