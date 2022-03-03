require("dotenv/config");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const apiRouter = require("./controllers");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);

app.listen(port, () => {
  console.log(`App on port ${port}`);
});