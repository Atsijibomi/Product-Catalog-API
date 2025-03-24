const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Import middleware
const errorHandler = require("./middleware/errorHandler");

// Import routes directly
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const variantRoutes = require("./routes/variantRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const searchRoutes = require("./routes/searchRoutes");

// Use API routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/variants", variantRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/search", searchRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
