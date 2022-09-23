require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./models/index");
const userAuthRouter = require("./routes/userAuth");
const adminAuthRouter = require("./routes/adminAuth");
const feedRouter = require("./routes/feed");
const adminApi = require("./routes/adminApi");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(multer({ storage: fileStorage, fileFilter }).single("avatar_url"));

app.use(userAuthRouter);
app.use(adminAuthRouter);
app.use(feedRouter);
app.use(adminApi);

// check if connection with database is successful
db.sequelize
  .authenticate()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(() => {
    throw Error("Unable to connect database");
  });
