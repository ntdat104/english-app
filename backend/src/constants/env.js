require('dotenv').config();

// PORT
exports.PORT = process.env.PORT;

// CORS
exports.CORS_ORIGIN = process.env.CORS_ORIGIN;

// BCRYPT
exports.SALT_ROUNDS = process.env.SALT_ROUNDS;

// MONGO
exports.MONGO_URL = process.env.MONGO_URL;
exports.MONGO_URL_LOCAL = process.env.MONGO_URL_LOCAL;

// NODE MAILER (GMAIL)
exports.NODE_MAILER_USER = process.env.NODE_MAILER_USER;
exports.NODE_MAILER_PASSWORD = process.env.NODE_MAILER_PASSWORD;

// JWT
exports.ALGORITHM = process.env.ALGORITHM;
exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
exports.JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY;
exports.JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION;
exports.JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION;
exports.JWT_ISS = process.env.JWT_ISS;

// GOOGLE API
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// FACEBOOK API
exports.FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
exports.FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

// CLOUDINARY
exports.CLOUD_NAME = process.env.CLOUD_NAME;
exports.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
exports.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
