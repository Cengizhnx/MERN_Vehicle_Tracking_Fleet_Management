import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("users", adminSchema);

export default Admin;
