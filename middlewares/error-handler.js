const { INTERNAL_SERVER_ERROR_STATUS, SERVER_ERROR } = require('../utils/constants');

const handleError = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR_STATUS, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR_STATUS
        ? SERVER_ERROR
        : message,
    });
  next();
};

module.exports = handleError;