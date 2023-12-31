const { User } = require('../models');

const getByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const createUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return user;
};

const deleteUser = async (id) => {
  const deletedUser = await User.destroy({ where: { id } });
  return deletedUser;
};

module.exports = {
 getByEmail,
 createUser,
 getAll,
 getById,
 deleteUser,
};
