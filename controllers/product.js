const { Router } = require("express");
const productRouter = Router();

productRouter.get("/", (req, res) => {
  res.send("all product");
});

module.exports = productRouter;
