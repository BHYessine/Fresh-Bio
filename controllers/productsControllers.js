const products = require("../models/product");

//ADD PRODUCT
exports.addproduct = async (req, res) => {
  try {
    const findProduct = await products.findOne({ title: req.body.title });
    if (findProduct) {
      return res
        .status(400)
        .send({ message: "This product is aleardy exist", findProduct });
    }
    const newProduct = new products(req.body);
    await newProduct.save();
  } catch (err) {
    res.status(500).send(err);
  }
};

//GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const allProducts = await products.find();
    res.status(200).send({ allProducts });
  } catch (err) {
    res.status(500).send(err);
  }
};
//GET ONE PRODUCT
exports.getProduct = async (req, res) => {
  try {
    const product = await products.findById(req.params.id);
    res.status(200).send({ product });
  } catch (err) {
    res.status(500).send(err);
  }
};
//UPDATE PRODUCT
exports.editProduct = async (req, res) => {
  try {
    const editProduct = await products.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body, updatedAt: Date.now() } }
    );
    res.status(200).send({ editProduct });
  } catch (err) {
    res.status(500).send(err);
  }
};

//DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await products.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: "Product deleted successfully." });
  } catch (err) {
    res.status(500).send(err);
  }
};
