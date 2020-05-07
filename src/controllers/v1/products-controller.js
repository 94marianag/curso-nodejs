const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
  try {
    const { title, description, price, images, userId } = req.body;

    const product = await Products.create({
      title,
      description,
      price,
      images,
      user: userId,
    });
    res.send({ status: 'OK', data: product });
  } catch (e) {
    console.log('CreateProduct error', e);
    res.status(500).send({ status: 'Error', data: e.message });
  }
};
const deleteProduct = (req, res) => {};
const getProduct = async (req, res) => {
  try {
    const products = await Products.find().populate('user', 'username, email');
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('deleteProduct eeror:', e);
    res.status(500).send({ status: 'Error', data: e.message });
  }
};

const getProductByUser = async (req, res) => {
  try {
    const products = await Products.find({
      user: req.params.userId,
    });
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('deleteProduct eeror:', e);
    res.status(500).send({ status: 'Error', data: e.message });
  }
};

module.exports = { createProduct, deleteProduct, getProduct, getProductByUser };
