const { Router } = require("express");
const cartRouter = Router();

cartRouter.get("/", (req, res) => {
  res.send("all cart");
});

module.exports = cartRouter;
