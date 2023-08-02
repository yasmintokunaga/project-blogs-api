const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const validateUser = (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }

  next();
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await UserService.getByEmail(email);
  if (user) {
    return res.status(409).json({
      message: 'User already registered',
    });
  }

  const newUser = await UserService.createUser(displayName, email, password, image);

  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const token = jwt.sign({
    data: {
      displayName: newUser.displayName,
      email: newUser.email,
      image: newUser.image,
    },
  }, secret, jwtConfig);

  res.status(201).json({ token });
};

const getAll = async (req, res) => {
  const users = await UserService.getAll();
  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const user = await UserService.getById(id);

  if (!user) {
    return res.status(404).json({
      message: 'User does not exist',
    });
  }

  return res.status(200).json(user);
};

module.exports = {
  createUser,
  validateUser,
  getAll,
  getById,
};
