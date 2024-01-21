import jwt from 'jsonwebtoken';

const cookieOptions = (isSecure) => {
  return {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: isSecure,
  };
};

export const verifyToken = (req, res, next) => {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  const token = req.cookies.auth;

  if (token === null) {
    return res.send(401).json({
      success: false,
      message: 'Authentifizierung fehlgeschlagen!',
    });
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        throw new Error(err);
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'FORBIDDEN ROUTE!!',
    });
    // res.status(401).end();
  }
};

export const createToken = (user) => {
  const userToken = { userId: user.userId, name: user.email, type: user.type };
  const options = { expiresIn: '1h' };
  const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, options);

  return accessToken;
};

export const createCookie = (accessToken, res, user) => {
  res.cookie('auth', accessToken, cookieOptions(true));
  res.cookie('fullName', user.fullName, cookieOptions(false));
  res.cookie('email', user.email, cookieOptions(false));
};

export const onlyForDoctors = (req, res, next) => {
  if (req.user.type === 'doctor') {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'FORBIDDEN ROUTE!!',
    });
  }
};
