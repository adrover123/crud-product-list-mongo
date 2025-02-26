require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const Product = require("./models/Product"); // Import Product model

const app = express();

// ✅ FIX 1: Apply CORS Middleware (Before Routes)
app.use(cors({
  origin: "*", // Allow all origins
  methods: "GET,POST,DELETE,PUT",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json()); // ✅ Allow JSON requests
app.use(bodyParser.json()); // ✅ Parse JSON requests

// ✅ FIX 2: Load MongoDB Connection from `.env`
const mongoURI = process.env.ATLAS_URI;
if (!mongoURI) {
  console.error("❌ MongoDB URI is not defined in .env");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ FIX 3: Ensure Routes Are Used Correctly
app.use("/products", productRoutes); // Use product routes from productRoutes.js

// ✅ FIX 4: Remove Duplicate `POST /products` Route from `server.js`
// This is already handled inside `productRoutes.js`

// ✅ Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
