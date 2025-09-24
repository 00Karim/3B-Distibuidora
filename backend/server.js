import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/3B-Distribuidora");
        console.log("MongoDB Conectado correctamente");
    } catch(err){
        console.error("MongoDB no ha sido conectado correctamente", err);
        process.exit(1);
    }
};