const Product = require("../models/products");

exports.postProduct = async (req, res, next) => {
  const {
    body: { name, price, stock, SKU, imageUrl },
  } = req;

  console.log(req.body);

  try {
    const product = await new Product({
      name,
      price,
      stock,
      SKU,
      imageUrl,
    }).save();
    res.status(201).send(product);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};

exports.patchProducts = async (req, res, next) => {
  const {
    body,
    params: { productId },
  } = req;

  try {
    const updatedProduct = await new Product.findByIdAndUpdate(productId, {
      ...body,
    });
    res.status(200).send(updatedProduct);
  } catch (error) {}
};

exports.deleteProduct = async (req, res, next) => {
  const {
    params: { productId },
  } = req;

  try {
    await Product.findByIdAndRemove(productId);
    res.status(204).send();
  } catch (error) {}
};
