import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import { app } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectMongoDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MONGODB CONNECTION FAILED!", error);
    });
