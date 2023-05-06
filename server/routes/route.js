import express from "express";
import { addRoute, getAllRoutes, updateStatusRoute } from "../controllers/route.js";

const router = express.Router();

router.get("/getAllRoutes", getAllRoutes);

router.post("/addRoute", addRoute);

router.put("/updateStatusRoute/:id", updateStatusRoute);

export default router;
