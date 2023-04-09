import mongoose from "mongoose";

const fleetSchema = new mongoose.Schema(
  {
    fleetOwner: {
      type: String,
      required: true,
    },
    fleetName: {
      type: String,
      required: true,
    },
    fleetAddress: {
      type: String,
      required: true,
    },
    fleetCars: {

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

const Fleet = mongoose.model("fleet", fleetSchema);

export default Fleet;
