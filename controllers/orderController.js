import orderModel from "../models/orderModel.js";

const newOrder = async (req, res) => {
  try {
    const body = req.body;
    const result = await orderModel.create(body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const showOrders = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await orderModel.find({ email: id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const showAllOrders = async (req, res) => {
  try {
    const { status = "" } = req.query;
    const result = await orderModel.find({ status: { $regex: status, $options: "i" } });
    res.status(200).json({ orders: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const cancelOrderByUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const order = await orderModel.findById(id);
    if(!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    if(status === "cancelled") {
      if(order.status !== "Pending") {
        return res.status(400).json({ message: "Order cannot be cancelled" });
      }
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const result = await orderModel.updateOne(
      { _id: id },
      { $set: { status } }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { newOrder, showOrders, showAllOrders, cancelOrderByUser, updateOrder };