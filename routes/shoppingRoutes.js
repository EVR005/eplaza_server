// const { playerDetails } = require("../models/player_details");
// const { userLogin } = require("../models/userlogin");
const { Products } = require("../models/products");
var logger = require("../utils/log")(module);
const sequelize = require("sequelize");

const express = require("express");
const router = express.Router();
// const Login = require("../controllers/auth/login");
const auth = require("../controllers/auth");
const authValidator = require("../validators/authValidator");
const { validate } = require("../validators/index");
const { Op } = require("sequelize");

router.get("/products", (req, res) => {
  Products.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error("Error finding users", err);
    });
});

router.get("/getDisplayProducts", (req, res) => {
  Products.findAll({
    attributes: ["id", "product_name", "image", "price"], // Specify the attributes to include in the result
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error("Error retrieving users", err);
    });
});

router.get("/getSortedProducts", (req, res) => {
  Products.findAll({
    attributes: ["id", "product_name", "image", "price"],
    order: [["price", req.query.sortKey == 1 ? "DESC" : "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error("Error retrieving users", err);
    });
});

router.get("/getProduct", (req, res) => {
  Products.findOne({
    where: { id: req.query.product_id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error("Error finding users", err);
    });
});

router.get("/getSearchResults", (req, res) => {
  Products.findAll({
    attributes: ["id", "product_name", "image", "price"],
    where: {
      [Op.or]: [
        {
          product_name: req.query.search_key.product_name
            ? { [Op.like]: `%${req.query.search_key.product_name}%` }
            : "",
        },
        {
          category: {
            [Op.in]:
              req.query.search_key.category != undefined &&
              req.query.search_key.category
                ? req.query.search_key.category
                : [],
          },
        },
        {
          color: {
            [Op.in]:
              req.query.search_key.color != undefined &&
              req.query.search_key.color
                ? req.query.search_key.color
                : [],
          },
        },
        {
          size: {
            [Op.in]:
              req.query.search_key.size != undefined &&
              req.query.search_key.size
                ? req.query.search_key.size
                : [],
          },
        },
      ],
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error("Error retrieving users", err);
    });
});

module.exports = router;
