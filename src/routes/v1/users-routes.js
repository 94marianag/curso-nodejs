const express = require('express');
const usersController = require('../../controllers/v1/users-controller');
const { isValidHostname, isAuth, isAdmin } = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', usersController.login);
router.post('/create', usersController.createUser);
router.post('/update', isValidHostname, isAuth, usersController.updateUser);
router.post('/delete', isAuth, isAdmin, usersController.deleteUser);
router.get('/get-all', isAuth, isAdmin, usersController.getUser);

module.exports = router;
