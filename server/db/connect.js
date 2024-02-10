const mongoose = require("mongoose");

const connect = async (url, db) => {
	return await mongoose.connect(url, { dbName: db });
};

mongoose.connection.on("connecting", () => {
	console.log("Establishing connection to MongoDB...");
});

mongoose.connection.on("connected", () => {
	console.log("MongoDB connected successfully...");
});

mongoose.connection.on("disconnected", () => {
	console.log("MongoDB disconnected...");
});

mongoose.connection.on("error", (err) => {
	console.error(err.message);
});

const gracefulExit = async () => {
	await mongoose.disconnect().then(() => {
		process.exit(0);
	});
};

process.on("SIGINT", gracefulExit);

module.exports = connect;
