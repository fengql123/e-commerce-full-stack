const { Router } = require("express");
const Order = require("../models/order");
const Product = require("../models/product");
const orderRouter = Router({ mergeParams: true });

//get all order of a user
orderRouter.get("/", async (req, res) => {
  try {
    const allOrders = await Order.findAll({
      where: { userId: req.id },
      include: Product,
    });
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = orderRouter;
