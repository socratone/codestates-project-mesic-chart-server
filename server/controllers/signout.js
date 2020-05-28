const signout = async (req, res) => {
 res.clearCookie('access-token');
 res.status(200).end();
};

module.exports = signout;