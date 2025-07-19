import customerModel from "../models/customer.model.js";
import userModel from "../models/user.model.js";

export const createCustomer = async (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    address,
    tags,
    assignedTo,
    status,
    notes,
  } = req.body;

  const agent = await userModel.findById({ _id: assignedTo });
  if (!agent) {
    return res.json({ success: false, message: "Assigned agent not found" });
  }

  try {
    const newLead = await customerModel.create({
      name,
      email,
      phone,
      company,
      address,
      assignedTo,
      tags,
      status,
      notes,
    });
    await newLead.save();
    return res.json({
      status: true,
      message: "Lead created successfully",
      customer: newLead,
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const customer = await customerModel
      .find()
      .populate("assignedTo", "name email");
    if (!customer || customer.length === 0) {
      return res.json({ success: false, message: "customer data not found" });
    }

    return res.json({ success: true, customers: customer });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await customerModel
      .find({ assignedTo: req.params.id })
      .populate("assignedTo", "-password");
    if (!customer) {
      return res.json({ success: false, message: "customer data not found" });
    }

    return res.json({ success: true, customers: customer });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const { name, email, phone, address, tags, assignedTo, notes } = req.body;
  const { id } = req.params;

  try {
    const customer = await customerModel.findByIdAndUpdate(
      { _id: id },
      { name, email, phone, address, tags, assignedTo, notes },
      { new: true }
    );
    if (!customer) {
      return res.json({ success: false, message: "customer data not found" });
    }

    return res.json({ success: true, customer: customer });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const get_customer_id = await customerModel.findById({ _id: id });
    if (!get_customer_id) {
      return res.json({ success: false, message: "customer data not found" });
    }

    await customerModel.findByIdAndDelete({ _id: id });
    return res.json({
      success: true,
      message: "customer data deleted successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
