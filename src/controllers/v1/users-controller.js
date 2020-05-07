const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../mongo/models/users');
const Product = require('../../mongo/models/products');

const expiresIn = '1d';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn }
        );
        res.send({ status: 'OK', dta: { token, expiresIn } });
      } else {
        res.status(401).send({ status: 'Invalid_Password', message: '' });
      }
      res.send({ status: 'Ok', dta: {} });
    } else {
      res.status(204).send({ status: 'User_Not_Found', message: '' });
    }
  } catch (error) {
    res.status(500).send({ status: 'Error', message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    console.log(req.body);

    const { username, email, password } = req.body;

    const hash = await bcrypt.hash(password, 15);

    await User.create({
      username, // username: username
      email,
      password: hash,
    });

    res.send({ status: 'OK', message: 'user created' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'Duplicated_values', message: error.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: 'contrasena invalida' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new Error('Missing param userId');
    }

    await User.findByIdAndDelete(userId);
    await Product.deleteMany({ user: userId });

    res.send({ status: 'OK', message: 'user deleted' });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find().select({ password: 0, __v: 0, role: 0 });
    res.send({ status: 'OK', data: users });
  } catch (error) {
    res.status(500).send({ status: 'Error', message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.sessionData.userId);
    const { username, email } = req.body;
    await User.findByIdAndUpdate(req.sessionData.userId, {
      username,
      email,
    });
    res.send({ status: 'OK', message: 'user updated' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'Duplicated_values', message: error.keyValue });
      return;
    }
    res.status(500).send({ status: 'Error', message: error.message });
  }
};

module.exports = { createUser, deleteUser, getUser, updateUser, login };
