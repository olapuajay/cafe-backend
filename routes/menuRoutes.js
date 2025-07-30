import express from "express";

import { addMenuItem, getAllMenuItems, getFeaturedItems, getMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const Router = express.Router();

Router.get("/", getAllMenuItems);
Router.get("/featured", getFeaturedItems);
Router.get("/:id", getMenuItem);

Router.post("/", authenticate, authorize("admin"), addMenuItem);
Router.patch("/:id", authenticate, authorize("admin"), updateMenuItem);
Router.delete("/:id", authenticate, authorize("admin"), deleteMenuItem);

export default Router;