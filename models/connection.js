require("dotenv").config({ path: "../.env" });
const conString = process.env.CONNECTION;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(conString);

module.exports = sequelize;
