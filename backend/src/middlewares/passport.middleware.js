const UserModel = require('../models/account.model/user.model');
const { KEYS, ACCOUNT_TYPES } = require('../constants');
const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-token').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const jwtService = require('../services/jwt.service');
const ENV = require('../constants/env');

// Authentication with JWT
exports.jwtAuthentication = async (req, res, next) => {
  try {
    res.locals.isAuth = false;
    let token = req.cookies ? req.cookies[KEYS.JWT_TOKEN] : null;

    // if not exist cookie[access_token] -> isAuth = false -> next
    if (!token) {
      next();
      return;
    }

    // verify jwt
    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const decoded = jwtService.verifyAccessToken(token);
    if (decoded) {
      const { accountId } = decoded.sub;
      let user = await UserModel.findOne({ accountId }).select(
        '-_id username name avt favoriteList coin',
      );

      if (user) {
        user.accountId = accountId;
        res.locals.isAuth = true;
        req.user = user;
      }
    }
    next();
  } catch (error) {
    console.error('Authentication with JWT ERROR: ', error);
    return res.status(401).json({
      message: 'Unauthorized.',
      error,
    });
  }
};

// Authentication with Google OAuth2
passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    },
    function (accessToken, refreshToken, profile, done) {
      try {
        if (!Boolean(profile)) {
          done(null, null);
          return;
        }

        const {
          given_name: givenName,
          family_name: familyName,
          email,
          picture,
          id,
        } = profile._json;

        done(null, {
          type: ACCOUNT_TYPES.GOOGLE,
          name: `${givenName} ${familyName}`,
          email,
          avt: picture,
          id,
        });
      } catch (error) {
        done(error, null);
        return;
      }
    },
  ),
);

// Authentication with Facebook OAuth2
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: ENV.FACEBOOK_CLIENT_ID,
      clientSecret: ENV.FACEBOOK_CLIENT_SECRET,
      fbGraphVersion: 'v3.0',
    },
    function (accessToken, refreshToken, profile, done) {
      try {
        if (!Boolean(profile)) {
          done(null, null);
          return;
        }

        const { name, email, id } = profile._json;

        done(null, {
          type: ACCOUNT_TYPES.FACEBOOK,
          name,
          email,
          avt: profile.photos[0]?.value,
          id,
        });
      } catch (error) {
        done(error, null);
        return;
      }
    },
  ),
);
