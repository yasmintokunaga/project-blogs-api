const jwt = require('jsonwebtoken');

const UserService = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

function extractToken(bearerToken) {
  if (bearerToken.includes('Bearer') || bearerToken.includes('bearer')) {
    return bearerToken.split(' ')[1];
  }
  return bearerToken;
}

module.exports = async (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(bearerToken);
  console.log(token);

  try {
    const decoded = jwt.verify(token, secret);
  
    const user = await UserService.getByEmail(decoded.data.email);

    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
