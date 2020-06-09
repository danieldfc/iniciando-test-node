const { Model, DataTypes } = require('sequelize');
const { sign } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');

const authConfig = require('../../config/auth');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        hooks: {
          beforeSave: async user => {
            if (user.password) {
              user.password = await hash(user.password, 8);
            }
          },
        },
      },
    );

    return this;
  }

  checkPassword(password) {
    return compare(password, this.password);
  }

  generateToken() {
    const { secret, expiresIn } = authConfig.jwt;

    return sign({}, secret, {
      subject: String(this.id),
      expiresIn,
    });
  }
}

module.exports = User;
