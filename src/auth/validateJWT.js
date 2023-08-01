const jwt = require('jsonwebtoken');

const { UserService } = require('../services');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';


function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

module.exports = async (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, secret);
  
    const user = await UserService.getByUserId(decoded.data.userId);

    /* Não existe um usuário na nossa base com o id informado no token. */
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }

    /* O usuário existe! Colocamos ele em um campo no objeto req.
       Dessa forma, o usuário estará disponível para outros middlewares que
       executem em sequência */
    req.user = user;

    /* Por fim, chamamos o próximo middleware que, no nosso caso,
       é a própria callback da rota. */
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
