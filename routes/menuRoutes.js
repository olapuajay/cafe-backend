import express from "express";

import { addMenuItem, getAllMenuItems, getFeaturedItems, getMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuController.js";

const Router = express.Router();

Router.post("/", addMenuItem);
Router.get("/", getAllMenuItems);
Router.get("/featured", getFeaturedItems);
Router.get("/:id", getMenuItem);
Router.patch("/:id", updateMenuItem);
Router.delete("/:id", deleteMenuItem);

export default Router;