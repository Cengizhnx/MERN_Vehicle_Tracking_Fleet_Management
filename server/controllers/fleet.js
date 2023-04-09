import Fleet from "../models/Fleet.js";
import { createError } from "../utils/error.js";

export const addFleet = async (req, res, next) => {
  try {
    const { fleetOwner, fleetName, fleetAddress, fleetCars, status } = req.body;

    const newFleet = new Fleet({
      fleetOwner,
      fleetName,
      fleetAddress,
      fleetCars,
      status,
    });

    if (
      !newFleet.fleetOwner ||
      !newFleet.fleetName ||
      !newFleet.fleetAddress ||
      !newFleet.fleetCars
    ) {
      res.status(401).json("Tüm alanları doldurun !");
      return next(createError(401, "Fill in all fields!"));
    }

    const savedFleet = await newFleet.save();
    res.status(201).json(savedFleet);
  } catch (err) {
    next(err);
  }
};

export const getAllFleets = async (req, res, next) => {
  try {
    const fleet = await Fleet.find();
    res.status(200).json(fleet);
  } catch (error) {
    next(error);
  }
};

export const getFleet = async (req, res, next) => {
  try {
    const fleet = await Fleet.findById(req.params.id);
    res.status(200).json(fleet);
  } catch (error) {
    next(error);
  }
};

export const updateFleet = async (req, res, next) => {
  const { fleetOwner, fleetName, fleetAddress, fleetCars, status } = req.body;

  const updateFleet = {
    fleetOwner: fleetOwner,
    fleetName: fleetName,
    fleetAddress: fleetAddress,
    fleetCars: fleetCars,
    status: status,
  };

  try {
    const fleet = await Fleet.findByIdAndUpdate(req.params.id, updateFleet);
    res.status(200).json(fleet);
  } catch (error) {
    next(error);
  }
};

export const updateStatusFleet = async (req, res, next) => {
  const { fleetOwner, fleetName, fleetAddress, status } = req.body;

  const tempStatus = req.body.status == "active" ? "passive" : "active";

  const updateFleet = {
    fleetOwner: fleetOwner,
    fleetName: fleetName,
    fleetAddress: fleetAddress,
    status: tempStatus,
  };

  try {
    const fleet = await Fleet.findByIdAndUpdate(req.body._id, updateFleet);
    res.status(200).json(fleet);
  } catch (error) {
    next(error);
  }
};

export const deleteFleet = async (req, res, next) => {
  try {
    await Fleet.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted !");
  } catch (error) {
    next(error);
  }
};
