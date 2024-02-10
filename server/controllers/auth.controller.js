const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../schema/user");
const Institution = require("../schema/institution");
const createHttpError = require("http-errors");
const validateUser = require("../utils/joi/register.validate");
const validateLogin = require("../utils/joi/login.validate");

const registerUser = asyncWrapper(async (req, res, next) => {
	try {
		const { firstName, lastName, username, institution, email, password } =
			await validateUser.validateAsync(req.body);
		const inst = await Institution.findOne({ name: institution });
		const user = await User.create({
			first_name: firstName,
			last_name: lastName,
			username,
			email,
			password,
			ins_id: inst._id,
		});
		if (!user) {
			return next(createHttpError.BadRequest("User not created"));
		}
		req.session.userId = user._id;
		res.status(201).json({ user });
	} catch (error) {
		console.log(error);
		next(createHttpError.InternalServerError("Something went wrong"));
	}
});

const registerInstitution = asyncWrapper(async (req, res, next) => {
	try {
		const { name } = req.body;
		const institution = await Institution.create({ name });
		if (!institution) {
			return next(createHttpError.BadRequest("Institution not created"));
		}
		res.status(201).json({ institution });
	} catch (error) {
		console.log(error);
		next(createHttpError.InternalServerError("Something went wrong"));
	}
});

const loginUser = asyncWrapper(async (req, res, next) => {
	try {
		const { username, password } = await validateLogin.validateAsync(
			req.body
		);

		const user = await User.findOne({ username });
		if (!user) {
			return next(createHttpError.NotFound("Invalid credentials"));
		}
		const isMatch = await user.isValidPassword(password);
		if (!isMatch) {
			return next(createHttpError.NotFound("Invalid credentials"));
		}
		req.session.userId = user._id;
		res.status(200).json({ user });
	} catch (error) {
		console.log(error);
		next(createHttpError.InternalServerError("Something went wrong"));
	}
});

const logoutUser = asyncWrapper(async (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			return next(
				createHttpError.InternalServerError("Something went wrong")
			);
		}
		res.clearCookie("sid");
		res.status(200).json({ message: "Logged out" });
	});
});

module.exports = {
	registerUser,
	registerInstitution,
	loginUser,
	logoutUser,
};
