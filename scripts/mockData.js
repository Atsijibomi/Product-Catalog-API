const mongoose = require("mongoose");
const Product = require("../models/Product");  
const Category = require("../models/Category");  

require("dotenv").config();


const categories = [
    { name: "Electronics", description: "Devices and gadgets designed for everyday use, from smartphones to home appliances." },
    { name: "Clothing", description: "Apparel for men, women, and children, including fashion-forward and seasonal items." },
    { name: "Furniture", description: "Functional and stylish furniture for your home and office, including sofas, tables, and chairs." },
    { name: "Books", description: "A wide selection of books across genres including fiction, non-fiction, and educational material." },
    { name: "Beauty & Personal Care", description: "Skincare, haircare, and beauty products to enhance your self-care routine." },
    { name: "Sports & Outdoors", description: "Equipment and gear for various sports and outdoor activities, from hiking to team sports." },
    { name: "Toys & Games", description: "Fun and educational toys and games for children and adults." },
    { name: "Home Improvement", description: "Tools, hardware, and materials for home renovation and maintenance projects." },
    { name: "Automotive", description: "Parts, accessories, and tools for cars and motorcycles, including maintenance and performance upgrades." },
    { name: "Groceries", description: "Everyday food and household essentials from fresh produce to pantry staples." }
];

const products = [
    { name: "Smartphone X", description: "Latest model smartphone with high-end features.", price: 999, category: "Electronics", stock: 50, variants: [{ color: "Black", size: "6.1 inch", stock: 30 }, { color: "Silver", size: "6.1 inch", stock: 20 }] },
    { name: "Laptop Pro", description: "Powerful laptop for work and gaming.", price: 1500, category: "Electronics", stock: 25, variants: [{ color: "Gray", size: "15 inch", stock: 15 }, { color: "Black", size: "15 inch", stock: 10 }] },
    { name: "Men's T-Shirt", description: "Casual and comfortable t-shirt.", price: 20, category: "Clothing", stock: 100, variants: [{ color: "Blue", size: "M", stock: 40 }, { color: "Red", size: "L", stock: 60 }] },
    { name: "Leather Sofa", description: "Luxury leather sofa for living rooms.", price: 750, category: "Furniture", stock: 10, variants: [{ color: "Brown", size: "3-seater", stock: 5 }, { color: "Black", size: "2-seater", stock: 5 }] },
    { name: "Cookbook", description: "A book full of delicious recipes.", price: 15, category: "Books", stock: 80, variants: [{ color: "N/A", size: "Hardcover", stock: 50 }, { color: "N/A", size: "Paperback", stock: 30 }] },
    { name: "Shampoo", description: "Organic shampoo for healthy hair.", price: 10, category: "Beauty & Personal Care", stock: 200, variants: [{ color: "N/A", size: "500ml", stock: 200 }] },
    { name: "Football", description: "Standard size football for matches.", price: 30, category: "Sports & Outdoors", stock: 60, variants: [{ color: "White", size: "Standard", stock: 60 }] },
    { name: "Children's Toy Car", description: "Fun and safe toy car for kids.", price: 25, category: "Toys & Games", stock: 120, variants: [{ color: "Red", size: "Small", stock: 60 }, { color: "Blue", size: "Medium", stock: 60 }] },
    { name: "Power Drill", description: "Cordless power drill for home improvement.", price: 120, category: "Home Improvement", stock: 35, variants: [{ color: "Green", size: "Standard", stock: 35 }] },
    { name: "Motor Oil", description: "Premium quality motor oil for vehicles.", price: 40, category: "Automotive", stock: 75, variants: [{ color: "N/A", size: "1L", stock: 75 }] }
];

const mockData = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI);

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Remove existing data (optional)
        await Product.deleteMany({});
        await Category.deleteMany({});


        // Insert categories and get their IDs
        const createdCategories = await Category.insertMany(categories);

        // Map categories to products
        const categoryMap = {};
        
        createdCategories.forEach(cat => {
            categoryMap[cat.name] = cat._id;
        });

        // Assign category ObjectId to each product
        const updatedProducts = products.map(product => ({
            ...product,
            category: categoryMap[product.category] || null, // Ensure valid category reference
        }));

        // Insert products with correct category references
        await Product.insertMany(updatedProducts);
        console.log("Products added.");

        console.log("Mock data seeded successfully.");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding data:", error);
        mongoose.connection.close();
    }
};

mockData();
