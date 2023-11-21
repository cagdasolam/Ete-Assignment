const Product = require('../model/productModel');
const Company = require('../model/companyModel');

const createProduct = async (req, res) => {
  try {
    const { name, category, amount, amountUnit, company } = req.body;
    const product = new Product({
      name,
      category,
      amount,
      amountUnit,
      company
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('company');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('company');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductCount = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.status(200).json({ productCount: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductCountGroupByCompany = async (req, res) => {
  try {
    const count = await Product.aggregate([
      {
        $group: {
          _id: '$company',
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(count.sort((a, b) => b.count - a.count));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductCount,
  getProductCountGroupByCompany
};