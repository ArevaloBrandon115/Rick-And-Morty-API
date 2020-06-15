const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const path = require("path");

const app = express();
const port = 8888;

// adding bodyParser
app.use(bodyParser.json());

// adding cors
app.use(cors());

// getting the absolue path of client
app.use(express.static(path.join(__dirname, "..", "/client")));

// requireing the routes
const apiRoutes = require("./api/routes.js");

// adding routs with /api as the starting url and the routes
app.use("/api", apiRoutes);

// displaying that the server is on
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
