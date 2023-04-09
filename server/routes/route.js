import express from "express";
import { addRoute, getAllRoutes } from "../controllers/route.js";

const router = express.Router();

router.get("/getAllRoutes", getAllRoutes);

router.post("/addRoute", addRoute);

export default router;
