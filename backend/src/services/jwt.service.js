const jwt = require('jsonwebtoken');
const ENV = require('../constants/env');

// Access token
exports.signAccessToken = (object) => {
  return jwt.sign(object, ENV.JWT_SECRET_KEY, {
    algorithm: ENV.ALGORITHM,
    expiresIn: ENV.JWT_ACCESS_EXPIRATION,
  });
};

exports.verifyAccessToken = (token) => {
  return jwt.verify(token, ENV.JWT_SECRET_KEY);
};

// Refresh token
exports.signRefreshToken = (object) => {
  return jwt.sign(object, ENV.JWT_SECRET_REFRESH_KEY, {
    algorithm: ENV.ALGORITHM,
    expiresIn: ENV.JWT_REFRESH_EXPIRATION,
  });
};

exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, ENV.JWT_SECRET_REFRESH_KEY);
};
