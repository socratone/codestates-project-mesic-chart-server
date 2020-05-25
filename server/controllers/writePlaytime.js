const { musics } = require('../../models/index');
const jwt = require('jsonwebtoken');

const wirtePlaytime = async (req, res) => {
  const token = req.cookies['access-token'];
  const secretKey = process.env.TOKEN_KEY;
  const user = await jwt.verify(token, secretKey);
  const body = req.body;

  if(!body.playtime || !body.videoId) {
    return res.status(400).send('잘못된 요청입니다.');
  }

  if(typeof body.playtime !== 'number') {
    return res.status(400).send('playtime에는 숫자만 들어갈 수 있습니다.');
  }

  const isOne = await musics.findOne({ 
    where: { 
      videoId: body.videoId,
      userId: user.id 
    } 
  });
  if (isOne === null) {
    return res.status(404).send('재생 리스트에서 videoId가 존재하지 않습니다.');
  } 

  console.log('isone의 재생시간', isOne.playtime);
  const totalPlaytime = body.playtime + isOne.playtime;
  await musics.update({ playtime: totalPlaytime }, {
    where: {
      userId: user.id,
      videoId: body.videoId
    }
  });
  res.status(200).send({ playtime: totalPlaytime });
};

module.exports = wirtePlaytime;