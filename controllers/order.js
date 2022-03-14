const { Router } = require("express");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const orderRouter = Router({ mergeParams: true });

orderRouter.get("/", async (req, res) => {
  try {
    const allOrders = await Order.findAll({
      where: { UserId: req.id },
      include: Product,
    });
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = orderRouter;
