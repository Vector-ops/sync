const Joi = require("joi");

const loginSchema = Joi.object({
	username: Joi.string().required().trim().lowercase().min(3).max(30),
	password: Joi.string().required().min(6),
});

module.exports = loginSchema;
