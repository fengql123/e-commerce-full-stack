require("dotenv").config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "database_development",
    host: DB_HOST,
    dialect: "postgresql",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "database_test",
    host: DB_HOST,
    dialect: "postgresql",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "database_production",
    host: DB_HOST,
    dialect: "postgresql",
  },
};
