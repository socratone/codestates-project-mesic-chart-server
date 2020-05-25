const { users } = require('../../models');
require('dotenv').config();
const getKakaoUse = require('../../kakaoApi');
const jwt = require('jsonwebtoken');

const kakaoSignin = async (req, res) => {
  const profile = await getKakaoUse(req);
  const email = profile.id + '@kakao';
  const name = profile.name;

  const [ user ] = await users.findOrCreate({
    where: { email },
    defaults: {
      name,
      password: '',
    }
  });

  const userInfo = {id : user.id};
  const secretKey = process.env.TOKEN_KEY;
  const options = {expiresIn: '1d'};
  const token = await jwt.sign(userInfo, secretKey, options);
  res.cookie('access-token', token, {httpOnly : true});
  res.status(201).json({token});
};

module.exports = kakaoSignin;