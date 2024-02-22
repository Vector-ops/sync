const errorHandler = (err, req, res, next) => {
	const message = err.message || "Something went wrong";
	const status = err.status || 500;
	console.log(err);
	return res.status(500).json({
		status,
		message,
	});
};

module.exports = errorHandler;
