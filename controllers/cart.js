const { Router } = require("express");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Product_Order = require("../models/product_order");
const cartRouter = Router();

const checkCartExist = async (req, res, next) => {
  const cartExist = (await Cart.findOne({ userId: req.id })) ? true : false;
  if (cartExist) {
    res.status(404).send("cart already created");
  } else {
    next();
  }
};

cartRouter.post("/", checkCartExist, async (req, res) => {
  try {
    const cart = await Cart.create(
      { UserId: req.id },
      {
        include: [User],
      }
    );
    res.status(200).send(cart);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

cartRouter.get("/", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: {
        UserId: req.id,
      },
    });
    const cartItems = await Cart.findOne({
      where: { id: cart.id },
      include: Product,
    });
    res.status(200).send(cartItems.Products);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

cartRouter.post("/sendOrder", async (req, res) => {
  try {
    const newOrder = await Order.create({ UserId: req.id });
    const cart = await Cart.findOne({
      where: {
        UserId: req.id,
      },
    });
    const cartItems = await Cart.findOne({
      where: { id: cart.id },
      include: Product,
    });
    cartItems.Products.map(async (product) => {
      await Product_Order.create({
        OrderId: newOrder.id,
        ProductId: product.id,
        product_qt: product.Cart_Product.product_qt,
      });
      await Product.decrement(
        { stock: product.Cart_Product.product_qt },
        { where: { id: product.id } }
      );
    });
    await Cart.destroy({
      where: { id: cart.id },
    });
    res.status(200).send("Order Sent");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = cartRouter;
