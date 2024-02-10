const Joi = require("joi");

const noteSchema = Joi.object({
	author: Joi.string().required().trim(),
	title: Joi.string().required().trim(),
	body: Joi.string().trim(),
});

module.exports = noteSchema;
