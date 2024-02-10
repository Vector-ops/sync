const Joi = require("joi");

const registerSchema = Joi.object({
	firstName: Joi.string().required().trim(),
	lastName: Joi.string().required().trim(),
	role: Joi.string()
		.valid("student", "teacher", "admin", "superadmin")
		.default("student"),
	institution: Joi.string().required(),
	username: Joi.string().required().trim().lowercase().min(3).max(30),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net"] },
	}),
	password: Joi.string().required().min(6),
});

module.exports = registerSchema;
