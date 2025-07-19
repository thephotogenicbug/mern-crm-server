import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
} from "../controllers/customer.controller.js";

const customerRouter = express.Router();

customerRouter.post("/create-customer", createCustomer);
customerRouter.get("/get-customer", getCustomer);
customerRouter.get("/get-customer/:id", getCustomerById);
customerRouter.put("/update-customer/:id", updateCustomer);
customerRouter.delete("/delete-customer/:id", deleteCustomer);

export default customerRouter;
