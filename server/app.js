require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./controllers');
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/signin', routes.signin);
app.use('/signup', routes.signup);

app.get('/musiclist', routes.getMusiclist);
app.post('/musiclist', routes.postMusiclist);
app.post('/delete', routes.deleteMusiclist);
app.post('/writeplaytime', routes.writePlaytime);

app.use('/kakao', (req, res) => {
  const kakao = `https://kauth.kakao.com/oauth/authorize?client_id=d2cea205f0cd1833041e88c0afbd0189&redirect_uri=http://3.34.124.39:3000/oauth&response_type=code`;
  return res.redirect(kakao);
});
app.use('/oauth', routes.kakaoSignin);

app.listen(3000, () => {
  console.log('listening 3000 port');
});

 

module.exports = app;