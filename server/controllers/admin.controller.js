const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../schema/user");
const Institution = require("../schema/institution");
const createHttpError = require("http-errors");
const Note = require("../schema/note");

const getInstitustions = asyncWrapper(async (req, res) => {
	const institutions = await Institution.find();
	res.status(200).json(institutions);
});

const getAllNotes = asyncWrapper(async (req, res) => {
	const notes = await Note.find().select("title body author");
	res.status(200).json(notes);
});

const getInstNotes = asyncWrapper(async (req, res) => {
	const instId = req.params.instId;
	const notes = await Note.find({
		institution_id: instId,
	}).select("title body author");
	res.status(200).json(notes);
});

module.exports = {
	getInstitustions,
	getInstNotes,
	getAllNotes,
};
