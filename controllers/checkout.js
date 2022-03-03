const { Router } = require("express");
const checkoutRouter = Router();

checkoutRouter.get("/", (req, res) => {
  res.send("all checkout");
});

module.exports = checkoutRouter;
