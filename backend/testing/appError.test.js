import { AppError } from '../utils/appError.js';

describe('Wir testen unsere Unhandled Route AppError Klasse', () => {
  test('Sollte uns eine App Error Instanz erzeugen!', () => {
    const errorMessage = 'Test Error';
    const statusCode = 404;

    const appError = new AppError(errorMessage, statusCode);

    expect(appError).toBeInstanceOf(AppError);
    expect(appError.message).toBe(errorMessage);
    expect(appError.statusCode).toBe(statusCode);
    expect(appError.status).toBe('fail');
    expect(appError.isOperational).toBe(true);
    expect(appError.stack).toBeDefined();
  });
});
