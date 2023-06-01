import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    starting: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    start: {
      type: Array,
      required: true,
    },
    end: {
      type: Array,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    customer_id: {
      type: String,
      required: true,
    },
    fleet_id: {
      type: String,
      required: true,
    },
    car_id: {
      type: Number,
      required: true,
    },
    driver_id: {
      type: Number,
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

const Route = mongoose.model("routes", routeSchema);

export default Route;
