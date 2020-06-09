const { Router } = require('express');

const SessionsController = require('../app/controllers/SessionsController');

const sessionRoutes = Router();

sessionRoutes.post('/', SessionsController.store);

module.exports = sessionRoutes;
