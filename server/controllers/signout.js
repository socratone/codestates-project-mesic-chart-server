const signout = async (req, res) => {
 res.clearCookie('access-token');
 res.redirect('http://mesic-chart-client.s3-website.ap-northeast-2.amazonaws.com/');
};

module.exports = signout;