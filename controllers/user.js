const { Router } = require("express");
const CheckOut = require("../models/checkoutModel");
const User = require("../models/userModel");
const hash = require("object-hash");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const userRouter = Router();

userRouter.post("/create", async (req, res) => {
  try {
    const newUser = await User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isSeller: req.body.isSeller,
        CheckOuts: [{ payment: req.body.payment }],
      },
      {
        include: [CheckOut],
      }
    );
    res.status(200).send(newUser.id);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

userRouter.get("/login", async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
      password: hash(req.body.password),
    },
  });
  if (user) {
    res.status(200).send(user.id);
  } else {
    res.status(404).send("user not found");
  }
});

userRouter.use("/:id", async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    next();
  } else {
    res.status(404).send("User does not exist.");
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

userRouter.put("/:id/edit", async (req, res) => {
  try {
    await User.update(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isSeller: req.body.isSeller,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send("update successful");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

userRouter.delete("/:id/delete", async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send("deleted");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

userRouter.get("/:id/checkout", async (req, res) => {
  try {
    const checkout = await CheckOut.findAll({
      where: {
        UserId: req.params.id,
      },
    });
    res.status(200).send(checkout);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = userRouter;
