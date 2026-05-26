const mongoose = require("mongoose");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

// 1. Your Local Database URL
const LOCAL_URI = "mongodb://127.0.0.1:27017/walmart";

// 2. PASTE YOUR ATLAS CLOUD STRING HERE BETWEEN THE QUOTES
const CLOUD_URI = "mongodb+srv://amankushwaha223:YOUR_PASSWORD_HERE@cluster0.os4e23d.mongodb.net/?appName=Cluster0";

async function migrateData() {
    try {
        console.log("📥 Connecting to Local Database...");
        await mongoose.connect(LOCAL_URI);
        
        const users = await User.find().lean();
        const products = await Product.find().lean();
        const orders = await Order.find().lean();
        
        console.log(`Found: ${users.length} Users, ${products.length} Products, ${orders.length} Orders.`);
        await mongoose.disconnect();

        if (CLOUD_URI.includes("YOUR_PASSWORD_HERE")) {
            console.log("\n❌ ERROR: You forgot to paste your Cloud URL password on line 9!");
            return;
        }

        console.log("\n🚀 Connecting to Cloud Database...");
        await mongoose.connect(CLOUD_URI);

        console.log("Clearing old cloud data...");
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Uploading local data to the cloud...");
        if(users.length > 0) await User.insertMany(users);
        if(products.length > 0) await Product.insertMany(products);
        if(orders.length > 0) await Order.insertMany(orders);

        console.log("\n✅ SUCCESS! All data migrated to the live website!");
        await mongoose.disconnect();
    } catch (err) {
        console.error("Migration failed:", err);
    }
}

migrateData();
