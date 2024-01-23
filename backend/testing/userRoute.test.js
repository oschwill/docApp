import supertest from 'supertest';
import { jest } from '@jest/globals';
import express from 'express';

const request = supertest(express);

jest.unstable_mockModule('mongoose');

describe('GET /user/all-doctors', () => {
  beforeAll(async () => {
    await mongooseMock.connect(process.env.MONGO_DB);
  });

  // VERBINDUNG ZUR DATENBANK SCHLIEßEN
  afterAll(async () => {
    await mongooseMock.connection.close();
  });

  test('Überprüfe die get Route, ob alle Doktoren in einem bestimmten Datatype zurückgeliefert werden', async () => {
    const response = await request.get('/api/v1/user/all-doctors');
    expect(response.statusCode).toBe(200);
  });
});

export {};
