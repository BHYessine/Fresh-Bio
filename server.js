require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connectDB");
const routesProducts = require("./routes/productsRoutes");
const routesUsers = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());
connectDB();
app.use("/api/products", routesProducts);
app.use("/api/users", routesUsers);
app.use(express.static(__dirname + "/client/build/"));
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, (err) =>
  err
    ? console.error(err.message)
    : console.log(`This server is running on localhost:${process.env.PORT}...`)
);
