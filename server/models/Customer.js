import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      default: "active",
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("customers", customerSchema);

export default Customer;
