// // routes/productRoutes.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const productController = require('../controllers/productController');

// // Set up multer for image uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Routes for product-related requests
// router.post('/', upload.single('image'), productController.createProduct); // Create a new product
// router.put('/:id', upload.single('image'), productController.updateProduct); // Update a product
// router.get('/', productController.getAllProducts); // Get all products
// router.get('/:id', productController.getProductById); // Get a single product by ID
// router.delete('/:id', productController.deleteProduct); // Delete a product


  

// module.exports = router;

const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// ✅ GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// ✅ POST a new product
router.post("/", async (req, res) => {
  try {
    console.log("Received product data:", req.body); // Debugging
    const { name, description, price } = req.body;
    
    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({ name, description, price });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ message: "Error adding product" });
  }
});

// ✅ DELETE a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
});

module.exports = router;

