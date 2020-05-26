const signout = async (req, res) => {
 res.clearCookie('access-token');
 res.redirect('http://3.34.124.39:3000/');
};

module.exports = signout;