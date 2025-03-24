const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const validateRequest = require("../middleware/validateRequest");
const Joi = require("joi");

// Define validation schema
const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional()
});

// Routes
router.get("/", categoryController.getAllCategories);
router.post("/", validateRequest(categorySchema), categoryController.createCategory); 
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", validateRequest(categorySchema), categoryController.updateCategory); 
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
