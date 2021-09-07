const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// parse json from the body
app.use(express.json());

// /users?name=fewgwe&fortran=true
// access req.query

app.set("view engine", "ejs");

const logger = (req, res, next) => {
	console.log(req.originalUrl);
	next();
};

app.get("/", (req, res) => {
	console.log(req.query);
	// res.download("server.js");
	// res.json({ msg: "Hi" });
	res.render("index", { text: "World" });
});

app.get("/:id", (req, res) => {
	console.log(req.query);
	// res.download("server.js");
	// res.json({ msg: "Hi" });
	res.render("index", { text: "World" });
});

const userRouter = require("./routes/users");

// app.use(logger);
app.use("/users", userRouter);

app.listen(3000);
