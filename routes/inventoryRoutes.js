const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const validateRequest = require("../middleware/validateRequest");
const Joi = require("joi");

// Define validation schema
const inventorySchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(0).required(),
});

// Routes
router.get("/", inventoryController.getAllInventory);
router.post("/", validateRequest(inventorySchema), inventoryController.createInventory);  
router.get("/:id", inventoryController.getInventoryById);
router.put("/:id", validateRequest(inventorySchema), inventoryController.updateInventory);  
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;
