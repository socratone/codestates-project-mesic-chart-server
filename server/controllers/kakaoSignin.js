const { users } = require('../../models');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const kakaoSignin = async (req, res) => {
  const {id, name} = req.body;
  const email = id + '@kakao.com';
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
  res.status(201).end();
};

module.exports = kakaoSignin;