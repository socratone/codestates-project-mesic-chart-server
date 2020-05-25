const { users } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signin = async (req, res) => {
  const { email, password } = req.body;   
  console.log(password);
  const user = await users.findOne({where : {email}});
  if(!user){
    return res.status(404).end('Nonexistent user');
  }
  
  const judge = await bcrypt.compare(password, user.password);

  if(judge) { 
    const userInfo = {id : user.id};
    const secretKey = process.env.TOKEN_KEY;
    const options = {expiresIn: '1d'};
    const token = await jwt.sign(userInfo, secretKey, options);
    res.cookie('access-token', token, {httpOnly : true});
    res.status(201).json({token});
  } else {
    res.status(404).end('Nonexistent user');
  }
  
};

module.exports = signin;