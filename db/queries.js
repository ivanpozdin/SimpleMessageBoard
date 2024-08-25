const pool = require("./pool");

exports.addMessage = async function (username, text) {
  const SQL = `
  INSERT INTO message (username, text)
  VALUES
    ($1, $2)
  `;
  await pool.query(SQL, [username, text]);
};

exports.getMessageById = async function (id) {
  const SQL = `
  SELECT * FROM message WHERE id=$1
  `;
  const { rows } = await pool.query(SQL, [id]);
  return rows[0];
};

exports.getAllMessages = async function () {
  const { rows } = await pool.query("SELECT * FROM message");
  return rows;
};
