const express = require('express');
const router = express.Router();
const { register, login, logout, isAuthenticated, authorizeRoles } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/some-protected-route', isAuthenticated, (req, res) => {
  res.status(200).json({ message: "Protected route accessed!" });
});
router.get('/admin-route', isAuthenticated, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: "Admin route accessed!" });
});

module.exports = router;
