const bcrypt = require('bcrypt');
const ENV = require('../constants/env');

exports.hash = async (password) => {
  return await bcrypt.hash(password, ENV.SALT_ROUNDS);
};

exports.compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
