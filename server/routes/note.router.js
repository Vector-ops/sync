const express = require("express");
const router = express.Router();
const {
	getInstNotes,
	createNotes,
	getAuthorNotes,
	getSingleNote,
	updateNotes,
	deleteNotes,
} = require("../controllers/note.controller");

router.route("/").get(getInstNotes);
router.route("/").post(createNotes);
router.route("/author").get(getAuthorNotes);

router
	.route("/:noteId")
	.get(getSingleNote)
	.put(updateNotes)
	.delete(deleteNotes);

module.exports = router;
