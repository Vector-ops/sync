const {
	registerUser,
	registerInstitution,
	loginUser,
	logoutUser,
} = require("../controllers/auth.controller");

const Router = require("express").Router;

const authRouter = Router();

authRouter.route("/register/user").post(registerUser);
authRouter.route("/register/institution").post(registerInstitution);
authRouter.route("/login/user").post(loginUser);
authRouter.route("/logout").get(logoutUser);

module.exports = authRouter;
