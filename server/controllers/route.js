import Route from "../models/Route.js";
import { createError } from "../utils/error.js";

export const addRoute = async (req, res, next) => {
  try {
    const {
      starting,
      destination,
      customer_id,
      fleet_id,
      car_id,
      driver_id,
      status,
    } = req.body;

    const newRoute = new Route({
      starting,
      destination,
      customer_id,
      fleet_id,
      car_id,
      driver_id,
      status,
    });

    console.log(newRoute);

    if (
      !newRoute.starting ||
      !newRoute.destination ||
      !newRoute.customer_id ||
      !newRoute.fleet_id ||
      !newRoute.car_id ||
      !newRoute.driver_id
    ) {
      res.status(401).json("Tüm alanları doldurun !");
      return next(createError(401, "Fill in all fields!"));
    }

    const savedRoute = await newRoute.save();
    res.status(200).json(savedRoute);
  } catch (err) {
    next(err);
  }
};

export const getAllRoutes = async (req, res, next) => {
  try {
    const route = await Route.find();
    res.status(200).json(route);
  } catch (error) {
    next(error);
  }
};

export const updateStatusRoute = async (req, res, next) => {
  const [route, routeStatus] = req.body;
  route.status = routeStatus.routeStatus;
  try {
    const routeUpdate = await Route.findByIdAndUpdate(route._id, route);
    res.status(200).json(routeUpdate);
  } catch (error) {
    next(error);
  }
};
