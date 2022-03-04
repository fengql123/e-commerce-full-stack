const { Router } = require("express");
const User = require("../models/userModel");
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("all user");
});

userRouter.post("/", async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.send(newUser);
});

module.exports = userRouter;
