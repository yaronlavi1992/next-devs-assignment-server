const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'my name is jeff', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/admin/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/admin/login');
  }
};

module.exports = { requireAuth };
