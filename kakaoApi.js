const fetch = require('node-fetch');
require('dotenv').config();

const getKakaoUser = async (req) => {
    const kakao = {
        id: process.env.KAKAO_CLIENT_ID,
        key: process.env.KAKAO_CLENT_SECRET,
        uri: 'http://localhost:3000/oauth'
    };
    const code = req.query.code;
    const res = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakao.id}&redirect_uri=${kakao.uri}&client_secret=${kakao.key}&code=${code}`);
    const data = await res.json();
    const token = data.access_token;
    const res2 = await fetch("https://kapi.kakao.com/v2/user/me",{
        method: 'POST',
        headers: {
                  Authorization: `Bearer ${token}`
                 }
      });
    const userinfo = await res2.json();
        return {
                id : userinfo.id,
                name : userinfo.properties.nickname
               };
};

module.exports = getKakaoUser;