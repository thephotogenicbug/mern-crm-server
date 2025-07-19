import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "agent"], default: "agent" },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model.user || mongoose.model("User", userSchema);
export default userModel;
