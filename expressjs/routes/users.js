const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("User list");
});

router.get("/new", (req, res) => {
	res.send("User form");
});

const getFun = (req, res) => {
	res.send(`Create user `);
};

const deleteFun = (req, res) => {
	res.send(`Delete user ${req.params.id}`);
};

router.route("/:id").get(getFun).delete(deleteFun);

// router.param("id", (req, res, next, id) => {
// 	console.log(id);
// 	req.user = { name: "John" };
// 	next();
// });

module.exports = router;
