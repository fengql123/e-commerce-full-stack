require("dotenv").config({ path: "../.env" });

const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "ecommerce",
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "ecommerce",
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "ecommerce",
    host: DB_HOST,
    dialect: "postgres",
  },
};
