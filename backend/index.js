require("dotenv").config();
const db = require("./models/index");
const { myapp } = require("./app");

const app = myapp(db);

// check if connection with database is successful
db.sequelize
  .authenticate()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(() => {
    throw Error("Unable to connect database");
  });
