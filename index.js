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
const { User, CheckOut } = require("./models");
const bcrypt = require("bcrypt");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/data/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter,
});

app.set("view-engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public/data/uploads", express.static("public/data/uploads"));

app.use(
  session({
    secret: "D53gxl41G",
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true, sameSite: "none" },
    resave: false,
    saveUninitialized: false,
  })
);
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

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

let id;

//log in
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    id = req.session.passport.user;
    res.redirect("/profile");
  }
);

//sign up
app.post("/create", upload.single("uploaded_file"), async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        isSeller: req.body.isSeller,
        avatar: req.file.path,
        CheckOuts: [{ payment: req.body.payment }],
      },
      {
        include: [CheckOut],
      }
    );
    res.status(200).redirect("/login");
  } catch (error) {
    res.status(404).redirect("/create");
  }
});

//log out
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

app.get("/create", (req, res) => {
  res.render("register.ejs");
});

const assignUserId = (req, res, next) => {
  req.id = id;
  console.log(req.id);
  next();
};

app.use("/", assignUserId, apiRouter);

sequelize.sync({ alter: true }).then(
  app.listen(port, () => {
    console.log(`App on port ${port}`);
  })
);
