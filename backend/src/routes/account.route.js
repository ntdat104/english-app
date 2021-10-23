const router = require('express').Router();
const accountController = require('../controllers/account.controller');
const passport = require('passport');
const passportConfig = require('../middlewares/passport.middleware');

router.post('/register', accountController.postRegisterAccount);
router.post('/login', accountController.postLogin);
router.post('/logout', accountController.postLogout);
router.post(
  '/login-gg',
  passport.authenticate('google-token', { session: false }),
  accountController.postLoginSocialNetwork,
);
router.post(
  '/login-fb',
  passport.authenticate('facebook-token', { session: false }),
  accountController.postLoginSocialNetwork,
);
router.post('/reset-password', accountController.postResetPassword);

router.put('/toggle-favorite', accountController.putToggleFavorite);
router.put(
  '/update-coin',
  passportConfig.jwtAuthentication,
  accountController.putUpdateUserCoin,
);
router.put(
  '/update-avt',
  passportConfig.jwtAuthentication,
  accountController.putUpdateAvt,
);
router.put(
  '/update-profile',
  passportConfig.jwtAuthentication,
  accountController.putUpdateProfile,
);

router.get(
  '/user-info',
  passportConfig.jwtAuthentication,
  accountController.getUserInfo,
);
router.get('/send-verify-code', accountController.getVerifyCode);
router.get(
  '/user-profile',
  passportConfig.jwtAuthentication,
  accountController.getUserProfile,
);

module.exports = router;
