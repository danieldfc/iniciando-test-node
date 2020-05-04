const User = require('../models/User');

class UserController {
  async store(req, res) {
    const { email } = req.body;

    const checkUser = await User.findOne({ where: { email } });

    if (checkUser) {
      return res.status(400).json({ error: { message: 'Duplicated user' } });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

module.exports = new UserController();
