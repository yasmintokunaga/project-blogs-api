const { BlogPost, PostCategory, User, Category } = require('../models');

const createPost = async (title, content, userId, categoryIds) => {
  // const dateNow = new Date();
  // const dateNowString = dateNow.toISOString();
  const newPost = await BlogPost.create(
    {
      title,
      content,
      userId,
      // published: dateNowString,
      // updated: dateNowString,
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
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const updatePost = async (id, title, content) => {
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  const updatedPost = await getById(id);
  return updatedPost;
};

const deletePost = async (id) => {
  const deletedPost = await BlogPost.destroy({ where: { id } });
  return deletedPost;
};

module.exports = { createPost, getAll, getById, updatePost, deletePost };
