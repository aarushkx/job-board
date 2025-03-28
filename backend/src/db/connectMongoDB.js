import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectMongoDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        console.log(
            `\nMONGODB connected successfully!\nDB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED!", error);
        process.exit(1);
    }
};

export default connectMongoDB;
