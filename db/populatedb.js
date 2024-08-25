#! /usr/bin/env node
require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS message (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ) NOT NULL,
  text VARCHAR ( 511 ) NOT NULL,
  added TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

INSERT INTO message (username, text) 
VALUES
  ('Bryan', 'First message'),
  ('Damon', 'Second message');
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: true,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();
