const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });

  return newCategory;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getById = async (categoryId) => {
  const category = await Category.findOne({
    where: { categoryId },
  });
  return category;
};

module.exports = { createCategory, getAll, getById };
