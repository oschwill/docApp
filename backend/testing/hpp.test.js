import { jest } from '@jest/globals';
import { avoidQueryParams } from '../middleware/hppPollution.js';

jest.unstable_mockModule('../middleware/hppPollution.js', () => {
  return {
    myFunction: jest.fn(),
  };
});

describe('Nicht authorisierte Query Parameter verhindern!', () => {
  let req, next;

  beforeEach(() => {
    req = {
      query: {
        param1: 'notAllowedValue1',
        param2: 'notAllowedValue1',
        name: 'name',
      },
    };
    next = jest.fn();
  });

  test('Sollte nicht authorisierte Parameter entfernen', async () => {
    await avoidQueryParams(req, null, next);

    expect(req.query.param1).toBeUndefined();
    expect(req.query.param2).toBeUndefined();
    expect(req.query.name).toEqual('name');
  });

  test('Sollte die nächste MiddleWare/Funktion aufrufen', async () => {
    await avoidQueryParams(req, null, next);

    expect(next).toHaveBeenCalled();
  });
});
