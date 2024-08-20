const { messages } = require("../model/messages");

exports.setBaseURL = (req, res, next) => {
  const protocol = req.protocol;
  const host = req.hostname;
  let port = "";
  if (process.env.PORT) {
    port = `:${process.env.PORT}`;
  }

  const fullUrl = `${protocol}://${host}${port}/`;
  res.locals.base = fullUrl;
  next();
};

exports.getHome = (req, res) => {
  res.render("index", { messages });
};

exports.getNew = (req, res) => {
  res.render("new");
};

exports.postNew = (req, res) => {
  const { user, text } = req.body;
  const newMessage = { text, user, added: new Date() };
  messages.push(newMessage);
  res.redirect("/");
};

exports.getMessage = (req, res) => {
  const i = parseInt(req.params.id);
  const message = messages[i];

  res.render("message-page", { message, id: i });
};
