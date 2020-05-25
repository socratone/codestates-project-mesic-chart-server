const { users } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
 
  const [ user, created ] = await users.findOrCreate({
    where: { email },
    defaults: {
      name,
      password: hashPass,
    }
  });
 
  if(created && user) {
    const userInfo = { id : user.id };
    const secretKey = process.env.TOKEN_KEY;
    const options = { expiresIn: '1d' };
    const token = await jwt.sign(userInfo, secretKey, options);
    res.cookie('access-token', token, { httpOnly : true });
    res.status(201).json({ token });
  } else {
    res.status(409).end('이미 존재하는 유저입니다.');
  }
};

module.exports = signup;