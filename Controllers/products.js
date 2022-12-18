const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { productModel } = require("../Models");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.json({ message: "Products Fetched successfully", products });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
const getProductById = async (req, res, next) => {
  try {
    const products = await productModel.findById(req.params.id);
    res.json({ message: "Products Fetched successfully", products });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
const unsoldProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({
      isSold: false,
      sellerId: { $ne: req.params.id },
    });
    res.json({ message: "Products Fetched successfully", products });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
const userPostedProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({ sellerId: req.params.id });
    res.json({ message: "Products Fetched successfully", products });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
const userPurchasedProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({ buyerId: req.params.id });
    res.json({ message: "Products Fetched successfully", products });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, location, sellerId, productId } =
      req.body;
    console.log(req.body);
    let imagess = req.files;
    console.log(imagess);
    let images = req.files.map((a) =>
      ("" + a.path).slice(7, ("" + a.path).length)
    );
    console.log(images);
    const product = new productModel({
      name,
      description,
      price,
      images,
      location,
      sellerId,
    });
    const savedProduct = await product.save();
    res.status(200).json({
      message: "Product saved succesfully",
      data: savedProduct,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const products = await productModel.findByIdAndRemove(req.params.productId);
    res.json({ message: "Product delete successfully" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
const sellProduct = async (req, res, next) => {
  try {
    const products = await productModel.findByIdAndUpdate(
      {
        _id: req.params.productId,
      },
      { buyerId: req.body.buyerId, isSold: req.body.sold || true }
    );
    res.json({ message: "Product Sold successfully" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  unsoldProducts,
  userPostedProducts,
  userPurchasedProducts,
  addProduct,
  deleteProduct,
  sellProduct,
};
