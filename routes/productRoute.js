import express from "express";
import { addProduct,showProducts,deleteProduct,updateProduct,getProduct,displayProducts } from "../controllers/productController.js";

const Router = express.Router();


//admin routes
Router.get("/", showProducts); // admin
Router.get("/all", displayProducts); // users
Router.post("/", addProduct);
Router.get("/:id", getProduct); // users
Router.patch("/:id", updateProduct);
Router.delete("/:id", deleteProduct);

export default Router;