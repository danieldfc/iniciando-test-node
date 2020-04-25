const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ ok: true });
});

routes.get('/users', (req, res) => {
  return res.json({ ok: true });
});

module.exports = routes;
