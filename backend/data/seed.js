
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const products = require('./products');
const User = require('../models/User');
const Cart = require('../models/Cart');
const users = require('./users'); // You need to create a users.js array similar to products.js

dotenv.config();

const seedData = async () => {
  try {
    // Seed Products
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");

    // Seed Users
    await User.deleteMany();
    await User.create(users);
    console.log("✅ Users seeded successfully");

    //Seed Cart
    await Cart.deleteMany();

    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(seedData)
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
