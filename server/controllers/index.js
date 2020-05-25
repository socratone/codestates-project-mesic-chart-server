const { getMusiclist, postMusiclist, deleteMusiclist } = require('./musiclist');

module.exports = {
  signin : require('./signin'),
  signout: require('./signout'),
  signup: require('./signup'),
  getMusiclist,
  postMusiclist,
  deleteMusiclist,
  writePlaytime : require('./writePlaytime')
};