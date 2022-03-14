require("dotenv/config");
const express = require("express");
const sequelize = require("./models/connection");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const apiRouter = require("./controllers");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", apiRouter);

sequelize.sync({ alter: true }).then(
  app.listen(port, () => {
    console.log(`App on port ${port}`);
  })
);
