const { Router } = require("express");
const apiRouter = Router();
const orderRouter = require("./order");
const userRouter = require("./user");
const cartRouter = require("./cart");
const productRouter = require("./product");

//allow all other routers to use userId as req.id
const assignUserId = (req, res, next) => {
  req.id = req.params.id;
  next();
};

apiRouter.use("/:id/order", assignUserId, orderRouter);
apiRouter.use("/:id/product", assignUserId, productRouter);
apiRouter.use("/:id/cart", assignUserId, cartRouter);
apiRouter.use("/", userRouter);

module.exports = apiRouter;
