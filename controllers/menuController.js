import menuModel from "../models/menuModel.js";

export const addMenuItem = async (req, res) => {
  try {
    const body = req.body;
    const result = await menuModel.create(body);
    res.status(201).json({ message: "Item added to menu successfully!", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllMenuItems = async (req, res) => {
  try {
    const result = await menuModel.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Items fetched successfully!", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await menuModel.findById(id);
    res.status(200).json({ message: "Item found!", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const result = await menuModel.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json({ message: "Item updated successfully!", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await menuModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deleted successfully!", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};