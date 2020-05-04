const { Router } = require('express');

const UserController = require('../app/controllers/UserController');

const userRoutes = Router();

userRoutes.post('/', UserController.store);

module.exports = userRoutes;
