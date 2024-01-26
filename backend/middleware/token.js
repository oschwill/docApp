import jwt from 'jsonwebtoken';

const cookieOptions = (hasHttpFlag, isSecure) => {
  return {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: hasHttpFlag,
    secure: isSecure,
  };
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.auth;

  if (token === null) {
    return res.status(401).json({
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
  }
};

export const createToken = (user) => {
  const userToken = { userId: user.userId, name: user.email, type: user.type };
  const options = { expiresIn: '1h' };
  const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, options);

  return accessToken;
};

export const createCookie = (accessToken, res, user) => {
  res.cookie('auth', accessToken, cookieOptions(true, true));
  res.cookie('fullName', user.fullName, cookieOptions(false, false));
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
