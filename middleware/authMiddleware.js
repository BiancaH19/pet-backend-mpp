const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key'; // folosește aceeași cheie ca la login

// Middleware general – verifică token-ul
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ error: 'Missing token' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    req.user = user; // conține: userId, role
    next();
  });
}

// Middleware pentru protejarea rutelor admin
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Access denied – Admins only' });
  }
  next();
}

module.exports = {
  authenticateToken,
  requireAdmin
};
