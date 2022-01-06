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

// Purchase a product
router.post("/:id", async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId)
    .exec()
    .catch((err) => res.status(404).json({ message: "No user found" }));

  const product = await Product.findById(req.params.id)
    .exec()
    .catch((err) => res.status(404).send("No product found"));

  if (user.isMember) {
    if (user.accountBalance < product.price) {
      res.status(400).json({ error: "Insufficient funds" });
      return;
    }

    if (product.quantityInStock === 0) {
      return res.status(400).json({ message: "Product out of stock" });
    }

    const purchase = {
      product: product.name,
      price: product.price
    };

    user.purchases.push(purchase);
    user.accountBalance -= product.price;
    product.quantityInStock -= 1;
    await user.save();
    await product.save();
    res.json(user);
  } else {
    return res.status(400).json({ message: "User is not a member" });
  }
});

module.exports = router;
