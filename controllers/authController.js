const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_jwt_secret_key"; 

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token is not valid' });
    req.user = user;
    next();
  });
};

module.exports = { isAuthenticated };
