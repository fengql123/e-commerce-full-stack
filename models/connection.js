require("dotenv").config({ path: "../.env" });
const conString = process.env.CONNECTION;
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(conString, {
  dialect: "postgres",
  logging,
  ssl: false,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

console.log(DB_PASSWORD);
module.exports = sequelize;
