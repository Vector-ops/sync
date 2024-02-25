const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../schema/user");
const Institution = require("../schema/institution");
const createHttpError = require("http-errors");
const validateUser = require("../utils/joi/register.validate");
const validateLogin = require("../utils/joi/login.validate");

const registerUser = asyncWrapper(async (req, res, next) => {
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
	res.sendStatus(201);
});

const registerInstitution = asyncWrapper(async (req, res, next) => {
	const { name, email } = req.body;
	const inst = await Institution.find({ $or: [{ name }, { email }] });
	if (inst.length > 0) {
		return next(createHttpError.Conflict("Institution already exists"));
	}
	const institution = await Institution.create({ name, email });
	if (!institution) {
		return next(createHttpError.BadRequest("Institution not created"));
	}
	const user = await User.create({
		first_name: institution.name,
		last_name: "admin",
		username: institution.name + "_admin",
		email: institution.email,
		role: "admin",
		password: institution.name + "_admin",
		ins_id: institution._id,
	});
	if (!user) {
		return next(createHttpError.BadRequest("User not created"));
	}
	res.status(201).json({
		message: "Institution created",
		admin: user.username,
		password: institution.name + "_admin",
	});
});

const loginUser = asyncWrapper(async (req, res, next) => {
	const { username, password } = await validateLogin.validateAsync(req.body);

	const user = await User.findOne({ username });
	if (!user) {
		return next(createHttpError.NotFound("Invalid credentials"));
	}
	const isMatch = await user.isValidPassword(password);
	if (!isMatch) {
		return next(createHttpError.NotFound("Invalid credentials"));
	}

	const response = {
		username: user.username,
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email,
		role: user.role,
		institution: user.ins_id,
	};

	req.session.userId = user._id;
	res.status(200).json(response);
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
