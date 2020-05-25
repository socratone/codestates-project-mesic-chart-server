const { users } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signin = async (req, res) => {
  const { email, password } = req.body;   
  const user = await users.findOne(
    { where : { email } }
  );
  if(!user){
    return res.status(404).end('존재하지 않는 유저입니다.');
  }
  
  const judge = await bcrypt.compare(password, user.password);

  if(judge) { 
    const userInfo = { id : user.id };
    const secretKey = process.env.TOKEN_KEY;
    const options = { expiresIn: '1d' };
    const token = await jwt.sign(userInfo, secretKey, options);
    res.cookie('access-token', token, { httpOnly : true });
    res.status(201).json({ token });
  } else {
    res.status(404).end('비밀번호가 일치하지 않습니다.');
  }
};

module.exports = signin;