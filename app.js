const express = require("express");
const app = express();
const path = require("node:path");

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));

let messages = [
  {
    text: "First message!:)",
    user: "Magno",
    added: new Date(),
  },
  {
    text: "Second message",
    user: "Carl",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render("index", { messages });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  const { user, text } = req.body;
  const newMessage = { text, user, added: new Date() };
  messages.push(newMessage);
  res.redirect("/");
});

app.get("/message/:id", (req, res) => {
  const i = parseInt(req.params.id);
  const message = messages[i];

  res.render("message-page", { message, id: i });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Started listening on PORT: ${PORT}`));
