const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
	{
		first_name: {
			type: String,
			required: [true, "must provide first name"],
			trim: true,
		},
		last_name: {
			type: String,
			required: [true, "must provide last name"],
			trim: true,
		},
		role: {
			type: String,
			enum: ["student", "teacher", "admin", "superadmin"],
			default: "student",
		},
		ins_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Institution",
		},
		username: {
			type: String,
			required: [true, "must provide username"],
			trim: true,
			lowercase: true,
			unique: true,
		},
		email: {
			type: String,
			required: [true, "must provide email"],
			trim: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, "must provide password"],
			min: 6,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.virtual("full_name").get(function () {
	return `${this.first_name} ${this.last_name}`;
});

userSchema.pre("save", async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw error;
	}
};

module.exports = mongoose.model("User", userSchema);
