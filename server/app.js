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
// app.use('/signout', routes.signout);
app.get('/musiclist', routes.getMusiclist);
app.post('/musiclist', routes.postMusiclist);
app.post('/delete', routes.deleteMusiclist);
app.post('/writeplaytime', routes.writePlaytime);

app.listen(3000, () => {
  console.log('listening 3000 port');
});

module.exports = app;