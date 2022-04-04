require("dotenv/config");
const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const apiRouter = require("./controllers");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User, CheckOut, Cart } = require("./models");
const bcrypt = require("bcrypt");
const multer = require("multer");

const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, sameSite: "none" },
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true;
}

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async function (username, password, done) {
    // Look up user in the db
    const user = await User.findOne({ where: { email: username } });
    if (!user) {
      console.log("User not found");
      return done(null, false);
    }
    const matchedPassword = await bcrypt.compare(
      password,
      user.dataValues.password
    );
    if (!matchedPassword) {
      console.log("wrong password");
      return done(null, false);
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.dataValues.id);
});

passport.deserializeUser(async (id, done) => {
  const user = User.findOne({ where: { id: id } });
  done(null, user);
});

let id;

//log in
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login", session: true }),
  (req, res) => {
    id = req.session.passport.user;
    res.json({ success: true });
  }
);

//sign up
app.post("/create", upload.single("avatar"), async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        isSeller: req.body.isSeller,
        avatar: req.file.buffer,
        avatar_type: req.file.mimetype.split("/")[1],
        CheckOuts: [{ payment: req.body.payment }],
      },
      {
        include: [CheckOut],
      }
    );
    await Cart.create(
      { userId: newUser.id },
      {
        include: [User],
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

//log out
app.get("/logout", (req, res) => {
  req.logout();
  res.send({ logout: true });
});

const assignUserId = (req, res, next) => {
  req.id = id;
  next();
};

app.use("/", assignUserId, apiRouter);

sequelize.sync({ alter: true }).then(
  app.listen(port, () => {
    console.log(`App on port ${port}`);
  })
);
