require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./models/index");
const userAuthRouter = require("./routes/userAuth");
const feedRouter = require("./routes/feed");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(userAuthRouter);
app.use(feedRouter);

// check if connection with database is successful
db.sequelize
  .authenticate()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(() => {
    throw Error("Unable to connect database");
  });
