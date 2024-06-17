
import mongoose from "mongoose";

import color from "colors";

// MONGO URL 

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/food-delivery";


// Create Connection
export const connectionDB = async () => {
    try {
        const connect = await mongoose.connect(MONGO_URI, {
         
        });

        console.log(`Congratulations! Your MongoDB Connected Successfully: ${connect.connection.host}`.cyan.bgCyan);

    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}
