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
  .connect("mongodb://localhost:27017/grocery_store", config)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Not connected to database ERROR! ", err);
  });

app.use("/api", require("./routes/api"));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
