const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', {
        expiresIn: '7d',
      });
      res.cookie('token', token, {
        maxAge: 3600 * 24 * 1000 * 7,
        secure: true,
        httpOnly: true,
        sameSite: false,
      })
      .send({ message: 'ура' });
    })
    .catch(next);
};
