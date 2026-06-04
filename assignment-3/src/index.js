/**
 * Author: Anisha Chhajer
 * Assignment 3: State Management API
 */

require('dotenv').config();
const app = require('./app.js');
const connectDB = require('./config/db.js');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URL || process.env.MONGO_URL;

console.log("MONGO_URI:", MONGO_URI);

const serverStart = async () => {
    if (!MONGO_URI) {
        console.error("MongoDB connection error: missing MONGO_URI / MONGODB_URL / MONGO_URL");
        process.exit(1);
    }

    try {
        await connectDB(MONGO_URI);
        console.log("MongoDB connected successfully");

    } catch (err) {
        console.log("MongoDB connection failed:", err);
        process.exit(1);
    }
     app.listen(PORT, () => {
            console.log(`Server started successfully on port ${PORT}`);
        });
};

serverStart();