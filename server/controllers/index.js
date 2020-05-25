const { getMusiclist, postMusiclist, deleteMusiclist } = require('./musiclist');

module.exports = {
  signin : require('./signin'),
  signup: require('./signup'),
  getMusiclist,
  postMusiclist,
  deleteMusiclist,
  writePlaytime: require('./writePlaytime'),
  kakaoSignin: require('./kakaoSignin')
};