const { Router } = require("express");
const { Cart, Product, Cart_Product, User } = require("../models");
const productRouter = Router();

//function to check whether a user is a seller
const checkSeller = async (req, res, next) => {
  const user = await User.findByPk(req.id);
  if (user.isSeller) {
    next();
  } else {
    res.status(404).send("user not a seller");
  }
};

//add a product by a seller
productRouter.post("/", checkSeller, async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      userId: req.id,
    });
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//get all product info
productRouter.get("/", async (req, res) => {
  try {
    const product = await Product.findAll();
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//check product exist
productRouter.use("/:productId", async (req, res, next) => {
  const product = await Product.findOne({
    where: {
      id: req.params.productId,
    },
  });
  if (product) {
    req.product = product;
    next();
  } else {
    res.status(404).send("product does not exist");
  }
});

//get single product info
productRouter.get("/:productId", async (req, res) => {
  try {
    res.status(200).send(req.product);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//add product to cart
productRouter.post("/:productId/addToCart", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.id,
      },
    });
    await Cart_Product.create({
      CartId: cart.id,
      ProductId: req.params.productId,
      product_qt: req.body.productQt,
    });
    res.status(200).send("Item Added");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = productRouter;
