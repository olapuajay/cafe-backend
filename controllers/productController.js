import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const body = req.body;
    const result = await productModel.create(body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const result = await productModel.findByIdAndUpdate(id, body);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productModel.findOne({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if(!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const products = await productModel.find({ category }).sort({ updatedAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

const showProducts = async (req, res) => {
  try {
    const { page = 1, limit = 3, search = "" } = req.query;
    const skip = (page - 1) * limit;
    const count = await productModel.countDocuments({
      productName: { $regex: search, $options: "i" },
    });
    const total = Math.ceil(count / limit);
    const products = await productModel
      .find({ productName: { $regex: search, $options: "i" } })
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });
    res.status(200).json({ products, total });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const displayProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({products});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await productModel.findById(req.params.id);

    if(!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating value" });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.id
    );
    if(alreadyReviewed) {
      alreadyReviewed.rating = Number(rating);
      alreadyReviewed.comment = comment;
    } else {
      const review = {
        user: req.user.id,
        name: req.user.firstName,
        rating: Number(rating),
        comment,
      }
      product.reviews.push(review);
    }

    product.averageRating = product.reviews.length > 0
      ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
      : 0;

    await product.save();
    res.status(201).json({ message: "Review added successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { addProduct, deleteProduct, updateProduct, getProduct, getProductByCategory, showProducts, displayProducts, addReview };