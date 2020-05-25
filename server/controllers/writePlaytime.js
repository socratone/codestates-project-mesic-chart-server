const { musics } = require('../../models/index');
const jwt = require('jsonwebtoken');

const wirtePlaytime = async (req, res) => {
  const token = req.cookies['access-token'];
  const secretKey = process.env.TOKEN_KEY;
  const user = await jwt.verify(token, secretKey);
  const body = req.body;

  if(!body.playtime || !body.video_url) {
    return res.status(400).send('잘못된 요청입니다.');
  }

  if(typeof body.playtime !== 'number') {
    return res.status(400).send('playtime에는 숫자만 들어갈 수 있습니다.');
  }

  const isOne = await musics.findOne({ 
    where: { 
      video_url: body.video_url,
      user_id: user.id 
    } 
  });
  if (isOne === null) {
    return res.status(404).send('재생 리스트에서 videoId가 존재하지 않습니다.');
  } 

  await musics.update({ playtime: body.playtime }, {
    where: {
      user_id: user.id,
      video_url: body.video_url
    }
  });
  res.status(200).send({ playtime: body.playtime });
};

module.exports = wirtePlaytime;