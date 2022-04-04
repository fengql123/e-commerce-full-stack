const { Router } = require("express");
const { User, CheckOut } = require("../models");
const hash = require("object-hash");
const userRouter = Router();

//get single user info
userRouter.get("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//edit single user info
userRouter.put("/edit", async (req, res) => {
  try {
    await User.update(
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        where: {
          id: req.id,
        },
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

//delete a user
userRouter.delete("/delete", async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.id,
      },
    });
    res.status(200).send("deleted");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//get a user's checkout info
userRouter.get("/checkout", async (req, res) => {
  try {
    const checkout = await CheckOut.findAll({
      where: {
        UserId: req.id,
      },
    });
    res.status(200).send(checkout);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = userRouter;
