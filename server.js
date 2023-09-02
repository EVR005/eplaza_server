var logger = require("./utils/log")(module);
const express = require("express");
const { sequelize } = require("./connection/db_connect");
const cors = require("cors");

// const userLogin = require("./models/userlogin");

const userLogins = require("./routes/loginRoutes");
const shoppingRoutes = require("./routes/shoppingRoutes");
const cartRoutes = require("./routes/cartRoutes");
const utils = require("./utils");
const { verifyToken } = require("./utils/token");
//const { BulkInsert } = require("./upload");

const app = express();

app.use(cors()); //update it when u integrate with frontend
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sequelize
  .sync()
  .then(() => {
    console.log("Treasure Hunt Database Synced!");
    logger.info("Treasure Hunt Database Synced!");
  })
  .catch((err) => {
    console.error("Error synchronizing Treasure Hunt DB", err);
    logger.info("Failed to sync db: " + err.message);
  });

// BulkInsert();

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/", userLogins);

app.use((req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers);
  console.log("hello token : " + token);
  // console.log(token);

  if (!token || token === "Bearer no_token")
    return res.status(401).send({ message: "token required" });

  const data = verifyToken(token);
  console.log("token data : " + req.query.id);
  // console.log(data);
  console.log("player_id :" + data.id);
  //set locals
  if (data !== null && data.id == req.query.id) {
    next();
  } else {
    return res.status(401).send({ message: "un-authorised access!!" });
  }
});

app.use("/", shoppingRoutes);
app.use("/", cartRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
