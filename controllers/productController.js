// controllers/productController.js
const cloudinary = require('cloudinary').v2;
const Product = require('../models/product');
const { v4: uuidv4 } = require('uuid'); // For unique filenames

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'your-cloud-name', // Replace with your Cloudinary cloud name
  api_key: 'your-api-key',       // Replace with your Cloudinary API key
  api_secret: 'your-api-secret', // Replace with your Cloudinary API secret
});

// Create a new product (with image upload)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    let imageUrl = '';

    // If there's an image uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { public_id: uuidv4() },
        (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Image upload failed' });
          }
          imageUrl = result.secure_url;
        }
      );
      req.pipe(result);
    }

    const product = new Product({ name, price, description, image: imageUrl });
    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a product (with image upload)
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const productId = req.params.id;
    let imageUrl = '';

    // If there's an image uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { public_id: uuidv4() },
        (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Image upload failed' });
          }
          imageUrl = result.secure_url;
        }
      );
      req.pipe(result);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description, image: imageUrl || undefined },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated', updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
