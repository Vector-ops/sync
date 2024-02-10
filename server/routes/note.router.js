const express = require("express");
const router = express.Router();
const {
	getAllNotes,
	createNotes,
	getSingleNote,
	updateNotes,
	deleteNotes,
} = require("../controllers/note.controller");

router.route("/").get(getAllNotes).post(createNotes);

router
	.route("/:noteId")
	.get(getSingleNote)
	.put(updateNotes)
	.delete(deleteNotes);

module.exports = router;
