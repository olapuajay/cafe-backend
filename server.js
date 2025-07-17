import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js"

import cors from "cors";

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

mongoose.connect(`mongodb://localhost:27017/merncafe`).then(() => {
  app.listen(8000, () => {
    console.log("Server started at port 8000");
    console.log("MongoDB connected");
  });
});

// mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.ypd9d9t.mongodb.net/merncafe?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
//   app.listen(8000, () => {
//     console.log("server started on port 8000");
//     console.log("connected to db");
//   });
// });

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter)