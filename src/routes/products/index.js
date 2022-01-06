const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const User = require("../../models/User");

router.get("/", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(404).json({ message: "No product found" }));
});

router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(404).json({ message: "No product found" }));
});

router.post("/:id", async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId)
    .exec()
    .catch((err) => res.status(404).json({ message: "No user found" }));

  const product = await Product.findById(req.params.id)
    .exec()
    .catch((err) => res.status(404).json({ message: "No product found" }));

  if (user.account_balance < product.price) {
    return res.status(400).json({ message: "Not enough money" });
  }

  if (product.quantityInStock === 0) {
    return res.status(400).json({ message: "Product out of stock" });
  }

  const purchase = {
    product: product.name,
    price: product.price
  };

  user.purchases.push(purchase);
  user.account_balance -= product.price;
  product.quantityInStock -= 1;
  await user.save();
  await product.save();
  res.json(user);
});

module.exports = router;
