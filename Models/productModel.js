const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is Required"],
    maxLength: 50,
  },

  description: { type: String, maxLength: 150 },

  price: {
    type: Number,
    trim: true,
    required: [true, "Price is Required"],
  },

  images: {
    type: [String],
    validate: [(val) => val.length > 0, "At least 1 image is required"],
  },

  location: { type: String, required: [true, "location is Required"] },

  isSold: {
    type: Boolean,
    default: false,
  },

  sellerId: {
    type: String,
    required: [true, "SellerId is Required"],
  },

  buyerId: {
    type: String,
    default: "",
  },
});

const productModel = mongoose.model("Products", productSchema);
module.exports = productModel;
