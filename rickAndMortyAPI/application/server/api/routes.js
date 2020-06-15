// use the express router to create endpoints in our server
const express = require("express");
const router = express.Router();

// adding the custom module
const rickandmorty = require("custom-module");

//search method by name
router.post("/search", async (req, res) => {
	try {
		const search = await rickandmorty.findByName(req.body.nameToSearch);

		res.json(search);
	} catch (err) {
		res.json({ err });
	}
});

//fetch by ID
router.post("/getByID", async (req, res) => {
	try {
		const getByID = await rickandmorty.findByID(req.body.id);

		res.json(getByID);
	} catch (err) {
		res.json({ err });
	}
});
module.exports = router;
