const jwt = require('jsonwebtoken');

// Middleware to check for a valid JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid Token' });
  }
};

// Middleware to restrict access based on user role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient Permissions' });
    }
    next();
  };
};

exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.split(' ')[1]; // Check for token
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user; // Attach user to request
    next();
  });
};

module.exports = { authenticateToken, authorizeRoles };
