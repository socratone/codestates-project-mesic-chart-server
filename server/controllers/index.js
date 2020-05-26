const { getMusiclist, postMusiclist, deleteMusiclist } = require('./musiclist');

module.exports = {
  signin : require('./signin'),
  signup: require('./signup'),
  signout: require('./signout'),
  getMusiclist,
  postMusiclist,
  deleteMusiclist,
  writePlaytime: require('./writePlaytime'),
  kakaoSignin: require('./kakaoSignin')
};