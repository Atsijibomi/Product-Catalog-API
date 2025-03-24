const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
;
const validateRequest = require("../middleware/validateRequest");
const Joi = require("joi");

// Define validation schema
const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
    stock: Joi.number().integer().min(0).required()
}); 

// Routes
router.get("/", productController.getProducts);
router.post("/", validateRequest(productSchema), productController.createProduct); 
router.get("/:id", productController.getProductById);
router.put("/:id", validateRequest(productSchema), productController.updateProduct); 
router.delete("/:id", productController.deleteProduct);

module.exports = router;
