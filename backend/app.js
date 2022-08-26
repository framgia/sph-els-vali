require("dotenv").config();
const express = require("express");
const db = require("./models/index");
const userAuthRouter = require("./routes/userAuth");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(userAuthRouter);

// check if connection with database is successful
db.sequelize
  .authenticate()
  .then(() => {
    app.listen(process.env.PORT)
  })
  .catch(() => {
    throw Error("Unable to connect database");
  });

