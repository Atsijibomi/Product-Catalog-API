const express = require("express");
const router = express.Router();
const variantController = require("../controllers/variantController");
const validateRequest = require("../middleware/validateRequest");
const Joi = require("joi");

// Define validation schema
const variantSchema = Joi.object({
    productId: Joi.string().required(),
    color: Joi.string().required(),
    size: Joi.string().required(),
    stock: Joi.number().integer().min(0).required(),
    price: Joi.number().positive().required(),
});

// Routes
router.get("/", variantController.getAllVariants);
router.post("/", validateRequest(variantSchema), variantController.createVariant);  
router.get("/:id", variantController.getVariantById);
router.put("/:id", validateRequest(variantSchema), variantController.updateVariant);  
router.delete("/:id", variantController.deleteVariant);

module.exports = router;
