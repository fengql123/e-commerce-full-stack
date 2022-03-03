const { Router } = require("express");
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("all user");
});

module.exports = userRouter;
