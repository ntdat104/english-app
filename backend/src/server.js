const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const https = require('https');

// import environment variables
const ENV = require('./constants/env');

// import local file
const { MAX } = require('./constants');
const corsConfig = require('./configs/cors');
const passportMiddleware = require('./middlewares/passport.middleware');
const accountRoute = require('./routes/account.route');
const blogRoute = require('./routes/blog.route');
const commonRoute = require('./routes/common.route');
const flashcardRoute = require('./routes/flashcard.route');
const gameRoute = require('./routes/game.route');
const highscoreRoute = require('./routes/highscore.route');
const sentenceRoute = require('./routes/sentence.route');
const wordRoute = require('./routes/word.route');

// ================== Setup ==================
const app = express();
app.use(express.static('build'));
app.disable('x-powered-by');
app.use(morgan('dev'));
app.get('/', (_, res) => {
  return res.sendFile(path.resolve('build', 'index.html'));
});

// ================== Auto wake up heroku ==================
app.get('/apis/wakeup-heroku', (_, res) => res.send('ok'));
const timer = 25 * 60 * 1000; // 25 minutes
setInterval(() => {
  https.get(`${ENV.CORS_ORIGIN}/apis/wakeup-heroku`);
}, timer);

// ================== Connect mongodb with mongoose ==================
const mongoose = require('mongoose');
const MONGO_URL = ENV.MONGO_URL || ENV.MONGO_URL_LOCAL;

mongoose.connect(MONGO_URL, () => {
  console.log('Connected to DB 🍕');
});

// ================== Config ==================
app.use(express.json({ limit: MAX.SIZE_JSON_REQUEST }));
app.use(express.urlencoded({ limit: MAX.SIZE_JSON_REQUEST }));
app.use(cookieParser());
app.use(cors(corsConfig));

// ================== Listening ... ==================
app.listen(ENV.PORT, () => {
  console.log(`Server is listening on: http://localhost:${ENV.PORT} 🍔`);
});

// ================== Routes ==================
const BASE_URL = '/apis';
app.use(`${BASE_URL}/account`, accountRoute);
app.use(`${BASE_URL}/word`, wordRoute);
app.use(`${BASE_URL}/games`, gameRoute);
app.use(`${BASE_URL}/flashcard`, flashcardRoute);
app.use(`${BASE_URL}/common`, commonRoute);
app.use(`${BASE_URL}/sentence`, sentenceRoute);
app.use(`${BASE_URL}/blog`, blogRoute);
app.use(
  `${BASE_URL}/highscore`,
  passportMiddleware.jwtAuthentication,
  highscoreRoute,
);

app.get('*', (_, res) => {
  return res.sendFile(path.resolve('build', 'index.html'));
});
