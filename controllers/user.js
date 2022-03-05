const { Router } = require("express");
const User = require("../models/userModel");
const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  res.send(users); //returning an array
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).send(newUser.toJSON());
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = userRouter;
