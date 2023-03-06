const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorizationError');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  console.log(1, 2, token);
  if (!token) {
    next(new AuthorizationError('Вы не авторизированы'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};
