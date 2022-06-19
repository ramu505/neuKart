const { Client } = require("pg");

console.log("DB_URL", process.env.DB_URL)
const client = new Client(process.env.DB_URL);

module.exports = client;