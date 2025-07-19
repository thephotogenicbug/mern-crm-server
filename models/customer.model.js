import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: Number },
    company: { type: String },
    address: { type: String },
    tags: [String],
    assignedTo: { type: mongoose.Schema.ObjectId, ref: "User" },
    status: {
      type: String,
      emun: ["new", "contacted", "converted"],
      default: "new",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

const customerModel =
  mongoose.model.customer || mongoose.model("Customer", customerSchema);
export default customerModel;
