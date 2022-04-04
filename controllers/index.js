const { Router } = require("express");
const apiRouter = Router();
const orderRouter = require("./order");
const userRouter = require("./user");
const cartRouter = require("./cart");
const productRouter = require("./product");

//allow all other routers to use userId as req.id
const assignUserId = (req, res, next) => {
  req.id = req.id;
  next();
};

apiRouter.use("/order", assignUserId, orderRouter);
apiRouter.use("/product", assignUserId, productRouter);
apiRouter.use("/cart", assignUserId, cartRouter);
apiRouter.use("/profile", assignUserId, userRouter);

module.exports = apiRouter;
