const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DBConnection = async () => {
    const MONGODB_URL = process.env.MONGODB_URL;

    // Validate that MongoDB URI is provided
    if (!MONGODB_URL) {
        console.error("Error: MONGODB_URL environment variable is not set");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

module.exports = { DBConnection };