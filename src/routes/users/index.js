const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ message: "No user found" }));
});

module.exports = router;
