const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

// Search and filter products
router.get("/", searchController.searchProducts);

module.exports = router;
