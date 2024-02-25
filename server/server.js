const express = require("express");
const connectDB = require("./db/connect");
require("dotenv").config();
const noteRoute = require("./routes/note.router");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/error-handler");
const cors = require("cors");
const validateSession = require("./middleware/validateSession");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authRouter = require("./routes/auth.router");
const adminRouter = require("./routes/admin.router");
const validateAdmin = require("./middleware/validateAdmin");

const app = express();

//port
const PORT = process.env.PORT || 3000;

//session
app.use(
	session({
		name: "sid",
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
		},
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
			mongoOptions: {
				dbName: process.env.MONGO_DB,
			},
		}),
	})
);

//middleware
app.use(
	cors({
		origin: "http://localhost:8080",
		methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
		credentials: true,
	})
);
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", validateSession, noteRoute);
app.use("/api/v1/admin", validateSession, validateAdmin, adminRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI, process.env.MONGO_DB);
		app.listen(PORT, () => {
			console.log(`Server is live at ${PORT}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
