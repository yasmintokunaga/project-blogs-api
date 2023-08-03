const { BlogPost, PostCategory, User, Category } = require('../models');

const createPost = async (title, content, userId, categoryIds) => {
  const newPost = await BlogPost.create(
    {
      title,
      content,
      userId,
      published: new Date(),
      updated: new Date(),
    },
  );

  const postCategoryPromises = categoryIds.map((categoryId) =>
    PostCategory.create({
      postId: newPost.id,
      categoryId,
    }));

  await Promise.all(postCategoryPromises);

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
