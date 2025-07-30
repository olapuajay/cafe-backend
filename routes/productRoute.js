import express from "express";
import { addProduct,showProducts,deleteProduct,updateProduct,getProduct,displayProducts } from "../controllers/productController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const Router = express.Router();


//admin routes
Router.get("/", authenticate, authorize("admin"), showProducts); // admin
Router.post("/", authenticate, authorize("admin"), addProduct);
Router.patch("/:id", authenticate, authorize("admin"), updateProduct);
Router.delete("/:id", authenticate, authorize("admin"), deleteProduct);

Router.get("/all", displayProducts); // users
Router.get("/:id", getProduct); // users

export default Router;