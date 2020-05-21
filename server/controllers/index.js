const {getMusiclist, postMusiclist} = require('./musiclist');


module.exports = {
  signin : require('./signin'),
  signout: require('./signout'),
  signup: require('./signup'),
  getMusiclist,
  postMusiclist
};