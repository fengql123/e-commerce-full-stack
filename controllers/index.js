const { Router } = require("express");
const apiRouter = Router();

const cartRouter = require("./cart");
const checkoutRouter = require("./checkout");
const orderRouter = require("./order");
const productRouter = require("./product");
const userRouter = require("./user");

apiRouter.use("/cart", cartRouter);
apiRouter.use("/checkout", checkoutRouter);
apiRouter.use("/order", orderRouter);
apiRouter.use("/product", productRouter);
apiRouter.use("/user", userRouter);

module.exports = apiRouter;
