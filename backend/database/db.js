const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DBConnction = async () => {
    const MONGO_URL = process.env.MONGODB_URL;

    // Validate that MongoDB URI is provided
    if (!MONGO_URI) {
        console.error("Error: MONGODB_URL environment variable is not set");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

module.exports = { DBConnction };