import Product from "../models/product.js";
import Category from "../models/category.js";

// @desc    Create a new product
// @route   POST /api/products
// @access  Admin
const createProduct = async (req, res) => {
  try {
    // ✅ Only admins can create
    if (!req.user || req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { name, price, stock, category, brand, description } = req.body;

    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return res
        .status(404)
        .json({ message: `Category '${category}' not found` });
    }

    if (!name || !price || !stock || !category) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const image = {
      url: req.file?.path || null,
      filename: req.file?.filename || null,
    };

    const product = await Product.create({
      name,
      price,
      stock,
      category: categoryDoc._id,
      brand,
      description, // ✅ added description
      image,
      author: req.user._id, // from auth middleware
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json(products); // ✅ send all products once
  } catch (error) {
    console.error(error); // log the real error for debugging
    res.status(500).json({ message: "Error fetching products" });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "author",
      "firstname lastname"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin
const updateProduct = async (req, res) => {
  try {
    // ✅ Only admins can update
    if (!req.user || req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { id } = req.params;
    let updates = req.body;

    // if new image uploaded, replace image
    if (req.file) {
      updates.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
const deleteProduct = async (req, res) => {
  try {
    // ✅ Only admins can delete
    if (!req.user || req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

export {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

// import Product from "../models/product.js";

// // @desc    Create a new product
// // @route   POST /api/products
// // @access  Admin
// const createProduct = async (req, res) => {
//   try {
//     const { name, price, stock, category, brand } = req.body;

//     if (!name || !price || !stock || !category) {
//       return res
//         .status(400)
//         .json({ message: "All required fields must be filled" });
//     }

//     const image = {
//       url: req.file?.path || null,
//       filename: req.file?.filename || null,
//     };

//     const product = await Product.create({
//       name,
//       price,
//       stock,
//       category,
//       brand,
//       image,
//       author: req.user._id, // from auth middleware
//     });

//     res.status(201).json({ message: "Product created successfully", product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // @desc    Get all products
// // @route   GET /api/products
// // @access  Public
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find().populate(
//       "author",
//       "firstname lastname"
//     );
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products" });
//   }
// };

// // @desc    Get single product
// // @route   GET /api/products/:id
// // @access  Public
// const getProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate(
//       "author",
//       "firstname lastname"
//     );
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching product" });
//   }
// };

// // @desc    Update a product
// // @route   PUT /api/products/:id
// // @access  Admin
// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     let updates = req.body;

//     // if new image uploaded, replace image
//     if (req.file) {
//       updates.image = {
//         url: req.file.path,
//         filename: req.file.filename,
//       };
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
//       new: true,
//     });
//     if (!updatedProduct)
//       return res.status(404).json({ message: "Product not found" });

//     res
//       .status(200)
//       .json({ message: "Product updated successfully", updatedProduct });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating product" });
//   }
// };

// // @desc    Delete a product
// // @route   DELETE /api/products/:id
// // @access  Admin
// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     if (!deletedProduct)
//       return res.status(404).json({ message: "Product not found" });
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting product" });
//   }
// };

// export {
//   createProduct,
//   getAllProducts,
//   getProduct,
//   deleteProduct,
//   updateProduct,
// };
