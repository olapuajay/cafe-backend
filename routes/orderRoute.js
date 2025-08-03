import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import {
  newOrder,
  showOrders,
  showAllOrders,
  cancelOrderByUser,
  updateOrder
} from "../controllers/orderController.js";
const Router = express.Router();

Router.get("/", authenticate, authorize("admin"), showAllOrders);
Router.patch("/:id", authenticate, authorize("admin"), updateOrder);
Router.post("/", authenticate, authorize("user"), newOrder);
Router.get("/:id", authenticate, authorize("user"), showOrders);
Router.patch("/:id/cancel", authenticate, authorize("user"), cancelOrderByUser);

export default Router;