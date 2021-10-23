const cloudinary = require('cloudinary').v2;
const ENV = require('../constants/env');

cloudinary.config({
  cloud_name: ENV.CLOUD_NAME,
  api_key: ENV.CLOUD_API_KEY,
  api_secret: ENV.CLOUD_API_SECRET,
});

module.exports = { cloudinary };
