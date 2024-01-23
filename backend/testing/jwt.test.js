import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/token.js';

jest.unstable_mockModule('../middleware/token.js', () => {
  return {
    myFunction: jest.fn(),
  };
});

describe('check our verifyToken middleware', () => {
  test('Sollte next aufrufen wenn token valide ist', () => {
    const req = {
      cookies: {
        auth: 'validToken',
      },
    };

    const res = {};
    const next = jest.fn();

    // Überprüfen, wenn wir immer das korrekt secret übergeben, das er next ausführt
    jwt.verify = jest.fn().mockImplementation((token, secret, cb) => {
      cb(null, { userId: '65a93b5bf22b37175036b3f9' });
    });

    verifyToken(req, res, next);

    // Sicher gehen ob die Argumente stimmen
    expect(jwt.verify).toHaveBeenCalledWith(
      'validToken',
      process.env.ACCESS_TOKEN_SECRET,
      expect.any(Function)
    );

    // Sollte next aufrufen...
    expect(next).toHaveBeenCalled();
  });

  test('Sollte 401 returnen wenn kein token vorhanden ist / Forbidden Route', () => {
    const req = {
      cookies: {
        auth: null,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    verifyToken(req, res, next);

    // Überprüfen ob der Response korrekt ist
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Authentifizierung fehlgeschlagen!',
    });

    // Überprüfen ob next() dann nicht ausgeführt wird
    expect(next).not.toHaveBeenCalled();
  });

  test('Sollte 401 returnen wenn token nicht valide ist / forbidden route', () => {
    const req = {
      cookies: {
        auth: 'invalidToken',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Werfen Error bei falschem Token
    jwt.verify = jest.fn().mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'));
    });

    verifyToken(req, res, next);

    // Überprüfen ob der Response korrekt ist
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'FORBIDDEN ROUTE!!',
    });

    // Überprüfen ob next() dann nicht ausgeführt wird
    expect(next).not.toHaveBeenCalled();
  });
});
