const User = require("../schema/user");

const validateAdmin = async (req, res, next) => {
	const userId = req.session.userId;
	const user = await User.findById({ _id: userId }).select("role");
	if (user.role === "superadmin") {
		next();
	} else {
		res.status(401).json({
			message: "You are not authorized to perform this action",
		});
	}
};

module.exports = validateAdmin;
