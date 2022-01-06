const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { config } = require("./config/database");

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

mongoose
  .connect("mongodb+srv://doni:xQfW3pEb!@cluster0.okj27.mongodb.net/myFirstDatabase?retryWrites=true&w=majoritygrocery-app", config)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Not connected to database ERROR! ", err);
  });

const index = require("./routes/index");
const users = require("./routes/users");
const products = require("./routes/products");

app.use("/", index);
app.use("/users", users);
app.use("/products", products);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
