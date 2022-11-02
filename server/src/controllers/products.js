const Product = require("../models/Product");

const getProducts = async (req, res) => {
  const products = await Product.find({}, "-__v");

  res.status(200).json({
    products,
  });
};

const getProduct = async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId, "-__v");

  res.status(200).json({
    product,
  });
};

const addProduct = async (req, res) => {
  const {
    imageUrl,
    name,
    count,
    size: { width, height },
    weight,
  } = req.body;

  const product = new Product({
    imageUrl,
    name,
    count,
    size: {
      width,
      height,
    },
    weight,
  });

  await product.save();

  res.status(200).json({
    message: "Success",
  });
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;

  const {
    imageUrl,
    name,
    count,
    size: { width, height },
    weight,
  } = req.body;

  const product = await Product.findOneAndUpdate(
    { _id: productId },
    {
      imageUrl,
      name,
      count,
      size: {
        width,
        height,
      },
      weight,
    },
    {
      new: true,
    }
  );

  res.status(200).json({ message: "Success" });
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  const deletedProduct = await Product.findByIdAndDelete(productId);

  res.status(200).json({
    message: "Success",
  });
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
