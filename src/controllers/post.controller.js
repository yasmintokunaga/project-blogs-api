const Post = require('../services/post.service');
const Category = require('../services/category.service');

const validatePost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  console.log('ok_validate');

  const verifyCategoryIds = await Promise
    .all(categoryIds.map((categoryId) => Category.getById(categoryId)));

  if (verifyCategoryIds.includes(undefined)) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req.user;

  const newPost = await Post.createPost(title, content, user.id, categoryIds);

  return res.status(201).json(newPost);
};

module.exports = {
  validatePost,
  createPost,
};
