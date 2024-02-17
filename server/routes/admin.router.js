const {
	getInstNotes,
	getAllNotes,
	getInstitustions,
} = require("../controllers/admin.controller");

const Router = require("express").Router;

const adminRouter = Router();

adminRouter.route("/institutions").get(getInstitustions);
adminRouter.route("/notes").get(getAllNotes);
adminRouter.route("/notes/:instId").get(getInstNotes);

module.exports = adminRouter;
