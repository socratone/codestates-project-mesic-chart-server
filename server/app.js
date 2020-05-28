require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./controllers');
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://mesic-chart-client.s3-website.ap-northeast-2.amazonaws.com'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/signin', routes.signin);
app.use('/signup', routes.signup);
app.use('/signout', routes.signout);
app.get('/musiclist', routes.getMusiclist);
app.post('/musiclist', routes.postMusiclist);
app.post('/delete', routes.deleteMusiclist);
app.post('/writeplaytime', routes.writePlaytime);
app.post('/googleSignin', routes.googleSignin); 
app.post('/kakaoSignin', routes.kakaoSignin);

app.listen(3001, () => {
  console.log('listening 3000 port');
});

 

module.exports = app;