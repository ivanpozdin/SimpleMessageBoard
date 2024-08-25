require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const controller = require("./controllers/controller");

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));

app.get("/", controller.setBaseURL, controller.getHome);

app.get("/new", controller.getNew);

app.post("/new", controller.postNew);

app.get("/message/:id", controller.setBaseURL, controller.getMessage);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Started listening on PORT: ${PORT}`));
