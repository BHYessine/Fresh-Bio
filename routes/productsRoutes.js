const express = require("express");
const {
  addproduct,
  getProducts,
  editProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/productsControllers");
const routerProducts = express.Router();

routerProducts.post("/addproduct", addproduct);
routerProducts.get("/allproducts", getProducts);
routerProducts.get("/product/:id", getProduct);
routerProducts.put("/editproduct/:id", editProduct);
routerProducts.delete("/deleteproduct/:id", deleteProduct);

module.exports = routerProducts;
