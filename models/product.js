// // models/product.js
// const mongoose = require('mongoose');

// // Product schema with an additional 'image' field for the Cloudinary URL
// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   description: { type: String, required: true },   
// });

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;
   

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);

