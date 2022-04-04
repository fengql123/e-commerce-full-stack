const { Router } = require("express");
const {
  Cart,
  Product,
  Product_Order,
  User,
  Order,
  Cart_Product,
} = require("../models");
const cartRouter = Router();

//ensure one user can only create one cart
const checkCartExist = async (req, res, next) => {
  const cartExist = (await Cart.findOne({ userId: req.id })) ? true : false;
  if (cartExist) {
    res.status(404).send("cart already created");
  } else {
    next();
  }
};

//create an empty cart
cartRouter.post("/", checkCartExist, async (req, res) => {
  try {
    const cart = await Cart.create(
      { userId: req.id },
      {
        include: [User],
      }
    );
    res.status(200).send(cart);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//get a user's cart info
cartRouter.get("/", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.id,
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

//send an order of a cart and empty the cart
cartRouter.post("/sendOrder", async (req, res) => {
  try {
    const newOrder = await Order.create({ userId: req.id });
    const cart = await Cart.findOne({
      where: {
        userId: req.id,
      },
    });
    console.log(cart);
    const cartItems = await Cart.findOne({
      where: { id: cart.id },
      include: Product,
    });
    console.log(cartItems);
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
    await Cart_Product.destroy({
      where: { CartId: cart.id },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

module.exports = cartRouter;
