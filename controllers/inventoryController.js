const Inventory = require("../models/Inventory");

// Create a new inventory record (or update if it exists)
exports.createInventory = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Check if the inventory for this product already exists
        const inventory = await Inventory.findOne({ product: productId });

        if (inventory) {
            // Update the existing inventory
            inventory.quantity = quantity;
            inventory.lastUpdated = Date.now();
            await inventory.save();
            res.json({ message: "Inventory updated successfully", inventory });
        } else {
            // Create a new inventory record
            const newInventory = new Inventory({
                product: productId,
                quantity,
                lastUpdated: Date.now(),
            });
            await newInventory.save();
            res.status(201).json({ message: "Inventory created successfully", newInventory });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all inventory records
exports.getAllInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find().populate("product");
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific inventory record by product ID
exports.getInventoryById = async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ product: req.params.id }).populate("product");
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update inventory quantity
exports.updateInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findOneAndUpdate(
            { product: req.params.id }, // Use product ID from URL parameter
            { quantity: req.body.quantity, lastUpdated: Date.now() },
            { new: true } // Return the updated document
        );

        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }

        res.json({ message: "Inventory updated successfully", inventory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an inventory record
exports.deleteInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findByIdAndDelete(req.params.id);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        res.json({ message: "Inventory deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
