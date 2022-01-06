const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    product: String,
    price: Number,
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    accountBalance: Number,
    isMember: Boolean,
    purchases: [purchaseSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

