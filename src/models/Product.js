const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantityInStock: Number,
});

const Product = mongoose.model("Product", productSchema);

export default Product;