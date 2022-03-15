require("dotenv").config({ path: "../.env" });
const conString = process.env.CONNECTION;
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

console.log(DB_PASSWORD);
module.exports = sequelize;
