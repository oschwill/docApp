import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null)
    return res.sendStatus(401).json({
      success: false,
      message: 'Authentifizierung fehlgeschlagen!',
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.sendStatus(403).json({
        success: false,
        message: 'FORBIDDEN ROUTE!!',
      });

    req.user = user;
    next();
  });
};

export const createToken = (user) => {
  const userToken = { name: user.email, type: user.type };
  const options = { expiresIn: '1h' };
  const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, options);

  return accessToken;
};

export const createCookie = (accessToken, res, user) => {
  res.cookie('jwt', { accessToken, userName: user.username, email: user.email }, cookieOptions);
  res.cookie('username', user.username, cookieOptions);
  res.cookie('email', user.email, cookieOptions);
};
