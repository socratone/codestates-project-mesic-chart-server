const { users } = require('../../models');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const googleSignin = async (req, res) => {
    const {email, name } = req.body;
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
  

module.exports = googleSignin;