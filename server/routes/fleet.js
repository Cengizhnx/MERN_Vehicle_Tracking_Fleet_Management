import express from "express";
import { addFleet, deleteFleet, getAllFleets, getFleet, updateFleet, updateStatusFleet } from "../controllers/fleet.js";

const router = express.Router();

router.get("/getAllFleets", getAllFleets);
router.get("/getFleet/:id", getFleet);

router.put("/updateFleet/:id", updateFleet);
router.put("/updateStatusFleet", updateStatusFleet);

router.post("/addFleet", addFleet);

router.delete("/deleteFleet/:id", deleteFleet);

export default router;
