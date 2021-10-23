const router = require('express').Router();
const wordController = require('../controllers/word.controller');
const { jwtAuthentication } = require('../middlewares/passport.middleware');

router.post('/contribute/add-word', wordController.postContributeWord);

router.get('/exist', wordController.getCheckWordExistence);
router.get('/pack', wordController.getWordPack);
router.get('/search-word', wordController.getSearchWord);
router.get('/word-details', wordController.getWordDetails);
router.get(
  '/favorite-list',
  jwtAuthentication,
  wordController.getUserFavoriteList,
);

module.exports = router;
