const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    product: String,
    price: Number,
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    account_balance: Number,
    is_member: Boolean,
    purchases: [purchaseSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

