const Note = require("../schema/note");
const User = require("../schema/user");
const asyncWrapper = require("../middleware/asyncWrapper");
const { customError } = require("../error/all-route-catch");

const getAllNotes = asyncWrapper(async (req, res) => {
	const { inst } = req.body;
	const notes = await Note.find({ institution: inst });
	res.status(200).json({ notes });
});

const getSingleNote = asyncWrapper(async (req, res, next) => {
	// TODO: check institution
	const noteId = req.params.noteId;
	const notes = await Note.findById(noteId);
	if (!notes) {
		return next(customError(404, `No notes with id: ${noteId}`));
	}
	res.status(200).json({ notes });
});

const createNotes = asyncWrapper(async (req, res) => {
	const { title, body } = req.body;
	const authorId = req.session.userId;
	const authorName = await User.findById(authorId);
	const notes = await Note.create({
		author_id: authorId,
		author: authorName.get("full_name"),
		title: title,
		body: body,
	});
	res.status(201).json({ notes });
});

const updateNotes = asyncWrapper(async (req, res, next) => {
	const noteId = req.params.noteId;
	const userId = req.session.userId;
	const { title, body } = req.body;
	const notes = await Note.findByIdAndUpdate(
		{
			_id: noteId,
			author_id: userId,
		},
		{
			title: title,
			body: body,
		},
		{
			new: true,
			runValidators: true,
		}
	);
	if (!notes) {
		return next(customError(404, `No notes with title: ${noteId}`));
	}
	res.status(200).json({ notes });
});

const deleteNotes = asyncWrapper(async (req, res, next) => {
	const noteId = req.params.noteId;
	const userId = req.session.userId;
	const notes = await Note.findOneAndDelete({
		_id: noteId,
		author_id: userId,
	});
	if (!notes) {
		return next(customError(404, `No notes with title: ${noteTitle}`));
	}
	res.sendStatus(200);
});

module.exports = {
	getAllNotes,
	getSingleNote,
	createNotes,
	updateNotes,
	deleteNotes,
};
