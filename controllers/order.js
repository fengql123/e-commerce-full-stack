const { Router } = require("express");
const orderRouter = Router();

orderRouter.get("/", (req, res) => {
  res.send("all order");
});

module.exports = orderRouter;
