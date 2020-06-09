const User = require('../models/User');

class SessionsController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return response
        .status(400)
        .json({ error: { message: 'User not found' } });
    }

    if (!(await user.checkPassword(password))) {
      return response
        .status(400)
        .json({ error: { message: 'Password does not match' } });
    }

    const { id, name } = user;

    return response.json({
      user: {
        id,
        name,
        email,
      },
      token: user.generateToken(),
    });
  }
}

module.exports = new SessionsController();
