const Note = require("../schema/note");
const User = require("../schema/user");
const asyncWrapper = require("../middleware/asyncWrapper");
const createHttpError = require("http-errors");

const getInstNotes = asyncWrapper(async (req, res) => {
	const userId = req.session.userId;
	const user = await User.findById(userId).select("ins_id");
	const notes = await Note.find()
		.where("institution_id")
		.equals(user.ins_id)
		.select("title body author");
	res.status(200).json({ notes });
});

const getSingleNote = asyncWrapper(async (req, res, next) => {
	const userId = req.session.userId;
	const noteId = req.params.noteId;
	const user = await User.findById(userId).select("ins_id");
	const notes = await Note.findById(noteId);
	if (!notes) {
		return next(createHttpError(404, `No notes found`));
	}
	if (user.ins_id !== notes.institution_id) {
		return next(createHttpError(404, `No notes found`));
	}
	res.status(200).json({ notes });
});

const createNotes = asyncWrapper(async (req, res, next) => {
	const { title, body } = req.body;
	const authorId = req.session.userId;
	const user = await User.findById(authorId).select("ins_id role");
	if (user.role === "student")
		return next(
			createHttpError(401, `You are not authorized to create notes`)
		);
	const authorName = await User.findById(authorId);
	const notes = await Note.create({
		author_id: authorId,
		author: authorName.get("full_name"),
		institution_id: user.ins_id,
		title: title,
		body: body,
	});
	res.status(201).json({ notes });
});

const updateNotes = asyncWrapper(async (req, res, next) => {
	const noteId = req.params.noteId;
	const userId = req.session.userId;
	const user = await User.findById(userId).select("ins_id role");
	if (user.role === "student")
		return next(
			createHttpError(401, `You are not authorized to update notes`)
		);
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
		return next(createHttpError(404, `No notes with found`));
	}
	res.status(200).json({ notes });
});

const deleteNotes = asyncWrapper(async (req, res, next) => {
	const noteId = req.params.noteId;
	const userId = req.session.userId;
	const user = await User.findById(userId).select("ins_id role");
	if (user.role !== "admin")
		return next(
			createHttpError(401, `You are not authorized to delete notes`)
		);
	const notes = await Note.findOneAndDelete({
		_id: noteId,
		institution_id: user.ins_id,
	});
	if (!notes) {
		return next(createHttpError(404, `No notes with title: ${noteTitle}`));
	}
	res.sendStatus(200);
});

module.exports = {
	getInstNotes,
	getSingleNote,
	createNotes,
	updateNotes,
	deleteNotes,
};
