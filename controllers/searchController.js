const Product = require("../models/Product");

exports.searchProducts = async (req, res) => {
    try {
        const { query, category, minPrice, maxPrice } = req.query;
        let filter = {};

        if (query) {
            filter.$or = [
                { name: new RegExp(query, "i") },
                { description: new RegExp(query, "i") }
            ];
        }

        if (category) filter.category = category;
        if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
        if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

        const products = await Product.find(filter).populate("category").populate("variants");
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
