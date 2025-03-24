const Variant = require("../models/Variant");

// Create a new variant
exports.createVariant = async (req, res) => {
    try {
        const variant = new Variant(req.body);
        await variant.save();
        res.status(201).json({ message: "Variant created successfully", variant });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all variants
exports.getAllVariants = async (req, res) => {
    try {
        const variants = await Variant.find().populate("product");
        res.json(variants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get variant by ID
exports.getVariantById = async (req, res) => {
    try {
        const variant = await Variant.findById(req.params.id).populate("product");
        if (!variant) return res.status(404).json({ message: "Variant not found" });
        res.json(variant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a variant
exports.updateVariant = async (req, res) => {
    try {
        const variant = await Variant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!variant) return res.status(404).json({ message: "Variant not found" });
        res.json({ message: "Variant updated successfully", variant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete a variant
exports.deleteVariant = async (req, res) => {
    try {
        const variant = await Variant.findByIdAndDelete(req.params.id);
        if (!variant) return res.status(404).json({ message: "Variant not found" });
        res.json({ message: "Variant deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
