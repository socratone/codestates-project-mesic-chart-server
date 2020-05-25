const { musics } = require('../../models/index');
const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_KEY;

module.exports = {
  getMusiclist : async (req, res) => {
    const token = req.cookies['access-token'];
    const user = await jwt.verify(token, secretKey);

    const musicList = await musics.findAll({ 
      where: { userId: user.id }
    });
    res.status(200).send(musicList);
  },
  postMusiclist : async (req, res) => {
    const token = req.cookies['access-token'];
    const { id } = await jwt.verify(token, secretKey);
    const body = req.body;
    if(!body.title || !body.description || !body.thumbnail || !body.videoId) {
      return res.status(400).send('잘못된 요청입니다.');
    } 
    const { title, description, thumbnail, videoId } = req.body;

    const [user, created] = await musics.findOrCreate({
      where: { videoId, userId: id },
      defaults: { title, description, thumbnail, playtime: 0 }
    });

    if (created) {
      res.status(200).send(user);
    } else {
      res.status(200).send('이미 추가된 음악입니다.');
    }
  },
  deleteMusiclist : async (req, res) => {
    const token = req.cookies['access-token'];
    const user = await jwt.verify(token, secretKey);
    const body = req.body;
    
    if(!body.videoId) {
      return res.status(400).send('잘못된 요청입니다.');
    } 

    const isOne = await musics.findOne({ 
      where: { 
        videoId: body.videoId,
        userId: user.id 
      } 
    });
    if (isOne === null) {
      console.log('Not found!');
      return res.status(404).send('해당 재생리스트에 url이 존재하지 않습니다.');
    } 

    try {
      await musics.destroy({
        where: {
          videoId: body.videoId,
          userId: user.id
        }
      });
    } catch {
      return res.status(500).send('삭제하지 못했습니다.');
    }
    res.status(200).send(body);
  }
};