import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Admin:Admin123@cluster0.qvfzctu.mongodb.net/food-del').then(() => {
        console.log("DB Connected");
    });
}