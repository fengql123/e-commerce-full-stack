require("dotenv").config({ path: "../.env" });
const conString = process.env.CONNECTION;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(conString);

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

test();
