import express from "express";
import {
  login,
  addCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  updateStatusCustomer,
  deleteCustomer,
} from "../controllers/customer.js";

const router = express.Router();

router.get("/getAllCustomers", getAllCustomers);
router.get("/getCustomer/:id", getCustomer);

router.put("/updateCustomer/:id", updateCustomer);
router.put("/updateStatusCustomer", updateStatusCustomer);

router.post("/addCustomer", addCustomer);
router.post("/login", login);

router.delete("/deleteCustomer/:id", deleteCustomer);

export default router;
