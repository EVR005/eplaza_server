const { Products } = require("../models/products");
const { Cart } = require("../models/cart");
var logger = require("../utils/log")(module);
const sequelize = require("sequelize");

const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const authValidator = require("../validators/authValidator");
const { validate } = require("../validators/index");
const { Op } = require("sequelize");

router.post("/pushtocart", async (req, res) => {
  const data = await Products.findOne({ where: { id: req.body.product_key } });
  const cartData = await Cart.findOne({
    where: { user_id: req.query.id, product_id: req.body.product_key },
  });
  await Products.update(
    {
      quantity: data.dataValues.quantity - req.body.req_quantity,
    },
    { where: { id: req.body.product_key } }
  );
  if (!cartData) {
    await Cart.create({
      user_id: req.query.id,
      req_quantity: req.body.req_quantity,
      product_id: req.body.product_key,
    })
      .then((res) => res.send({ message: "Successfully added to cart!" }))
      .catch((err) => res.send({ error: err }));
  } else {
    await Cart.update(
      {
        req_quantity: cartData.dataValues.req_quantity + req.body.req_quantity,
      },
      { where: { product_id: req.body.product_key, user_id: req.query.id } }
    )
      .then((res) => res.send({ message: "Successfully added to cart!" }))
      .catch((err) => res.send({ error: err }));
  }
});

router.get("/getcart", async (req, res) => {
  const data = await Cart.findAll({
    attributes: ["product_id"],
    group: ["product_id"],
    where: { user_id: req.query.id },
  });
  const quantData = await Cart.findAll({
    attributes: ["req_quantity"],
    group: ["product_id"],
    where: { user_id: req.query.id },
  });
  // console.log(quantData);
  const product_ids = await data.map((result) => result.product_id);
  await Products.findAll({
    where: {
      id: {
        [Op.in]: product_ids != undefined ? product_ids : [],
      },
    },
  })
    .then(async (data) => {
      await quantData.map(
        (res, k) => (data[k].dataValues.req_quantity = res.req_quantity)
      );
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "cant fetch cart!" });
    });
});

router.delete("/deleteitem", async (req, res) => {
  const data = await Products.findOne({ where: { id: req.query.product_key } });
  const cartData = await Cart.findOne({
    where: { user_id: req.query.id, product_id: req.query.product_key },
  });
  await Products.update(
    { quantity: data.dataValues.quantity + cartData.dataValues.req_quantity },
    { where: { id: req.query.product_key } }
  );
  await Cart.destroy({
    where: { user_id: req.query.id, product_id: req.query.product_key },
  });
  await Products.findAll({
    where: {
      user_id: req.query.id,
    },
  })
    .then((data) => res.send(data))
    .catch((err) => res.send({ message: "cant fetch cart!" }));
});

module.exports = router;
