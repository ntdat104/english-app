const router = require('express').Router();
const highscoreController = require('../controllers/highscore.controller');

router.put('/update', highscoreController.putUpdateHighScore);

router.get('/leaderboard', highscoreController.getLeaderboard);

module.exports = router;
