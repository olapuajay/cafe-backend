import express from "express";

import { addMenuItem, getAllMenuItems, getMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuController.js";

const Router = express.Router();

Router.post("/", addMenuItem);
Router.get("/", getAllMenuItems);
Router.get("/:id", getMenuItem);
Router.patch("/:id", updateMenuItem);
Router.delete("/:id", deleteMenuItem);

export default Router;