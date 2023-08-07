const express = require('express');
const login = require('./controllers/login.controller');
const user = require('./controllers/user.controller');
const category = require('./controllers/category.controller');
const post = require('./controllers/post.controller');
const validateJWT = require('./auth/validateJWT');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

app.post('/login', login.autenticationToken);

app.post('/user', user.validateUser, user.createUser);

app.get('/user', validateJWT, user.getAll);
app.get('/user/:id', validateJWT, user.getById);
app.delete('/user/me', validateJWT, user.deleteUser);

app.post('/categories', validateJWT, category.createCategory);
app.get('/categories', validateJWT, category.getAll);

app.post('/post', validateJWT, post.validatePost, post.createPost);
app.get('/post', validateJWT, post.getAll);
app.get('/post/:id', validateJWT, post.getById);
app.put('/post/:id', validateJWT, post.updatePost);
app.delete('/post/:id', validateJWT, post.deletePost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
