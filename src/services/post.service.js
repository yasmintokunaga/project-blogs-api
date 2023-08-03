const { BlogPost, PostCategory } = require('../models');

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

    if (categoryIds && categoryIds.length > 0) {
      const postCategoryPromises = categoryIds.map((categoryId) =>
        PostCategory.create({
          postId: newPost.id,
          categoryId,
        }));
  
      await Promise.all(postCategoryPromises);
    }

  return newPost;
};

module.exports = { createPost };
