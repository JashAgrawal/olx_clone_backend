const express = require("express");
const Controller = require("../Controllers");
const Router = express.Router();
const { upload } = require("../Config/multerSetup");
const authenticateRequest = require("../MiddleWare/auth");
//ProductRoutes
Router.get("/get_all_products", Controller.Product.getAllProducts);

Router.get("/get_product_by_id/:id", Controller.Product.getProductById);

Router.get("/unsold_products/:id", Controller.Product.unsoldProducts);

Router.get(
  "/userPosted_products/:id",
  authenticateRequest,
  Controller.Product.userPostedProducts
);

Router.get(
  "/userPurchased_products/:id",
  authenticateRequest,
  Controller.Product.userPurchasedProducts
);

Router.post(
  "/add_product",
  upload.array("images", 12),
  Controller.Product.addProduct
);

Router.post(
  "/delete_product/:productId",
  authenticateRequest,
  Controller.Product.deleteProduct
);

Router.post(
  "/sell_product/:productId",
  authenticateRequest,
  Controller.Product.sellProduct
);

module.exports = Router;
