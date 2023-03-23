import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    driver: {
      type: String,
    },
    avatar: {
      type: String,
      default: "",
    },
    phone_number: {
      type: String,
      required: true,
      min: 4,
      max: 15,
    },
    birth_date: {
      type: String,
      min: 4,
      max: 20,
    },
  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
