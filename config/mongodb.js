import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB Database connected successfully");
  });
  await mongoose.connect(process.env.MONGODB_URI);
};
