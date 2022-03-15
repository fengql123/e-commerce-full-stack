require("dotenv").config({ path: "../.env" });
const conString = process.env.CONNECTION;
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecommerce", DB_USERNAME, DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
