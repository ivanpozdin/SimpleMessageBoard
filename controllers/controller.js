const db = require("../db/queries");

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

exports.getHome = async (req, res) => {
  let messages = await db.getAllMessages();
  messages = messages.map((message) => {
    return { ...message, user: message.username };
  });

  res.render("index", { messages });
};

exports.getNew = (req, res) => {
  res.render("new");
};

exports.postNew = async (req, res) => {
  const { user, text } = req.body;

  await db.addMessage(user, text);

  res.redirect("/");
};

exports.getMessage = async (req, res) => {
  const id = parseInt(req.params.id);

  let message = await db.getMessageById(id);
  message = { ...message, user: message.username };
  res.render("message-page", { message });
};
