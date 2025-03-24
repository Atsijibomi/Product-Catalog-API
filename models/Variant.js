const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 }
});

variantSchema.index({ product: 1 });

module.exports = mongoose.model("Variant", variantSchema);
