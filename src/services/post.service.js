const { BlogPost, PostCategory, User, Category } = require('../models');

const createPost = async (title, content, userId, categoryIds) => {
  const dateNow = new Date();
  const dateNowString = dateNow.toISOString();
  const newPost = await BlogPost.create(
    {
      title,
      content,
      userId,
      published: dateNowString,
      updated: dateNowString,
    },
  );

  const postId = newPost.id;
  const insertsPostCategory = categoryIds.map((categoryId) => ({ postId, categoryId }));
  await PostCategory.bulkCreate(insertsPostCategory);

  return newPost;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, through: { attributes: [] } },
    ],
  });

  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, through: { attributes: [] } },
    ],
  });
  return post;
};

module.exports = { createPost, getAll, getById };
