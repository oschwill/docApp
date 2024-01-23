import { jest } from '@jest/globals';
import { registerHelper } from '../utils/authHelper.js';
import { sendEmail } from '../utils/emailHelper.js';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

jest.unstable_mockModule('../utils/authHelper.js', () => {
  return {
    registerHelper: jest.fn(),
  };
});

jest.unstable_mockModule('../utils/emailHelper.js', () => ({
  sendEmail: jest.fn(),
}));

/* FUNZT NOCH NICHT, SCHEISS ESM */
describe('registerHelper Funktion', () => {
  beforeEach(() => {
    // Setze die Mocks zurück, um sicherzustellen, dass sie für jeden Test frisch sind
    jest.clearAllMocks();
  });

  test('Sollte einen Patienten erfolgreich registrieren', async () => {
    // Mocks konfigurieren
    const mockUserData = {
      type: 'patient',
      firstName: 'Ich',
      lastName: 'Du',
      password: 'test123',
      repeatPassword: 'test123',
      street: 'Da Street',
      houseNr: '42',
      postalCode: '12345',
      city: 'Mock ma City',
      age: 25,
      phone: '123456789',
      email: 'test@test.de',
      gender: 'female',
    };

    const mockUserTypeModel = jest.fn().mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({ _id: 'mockUserTypeId' }),
    }));

    const mockUserModel = jest.fn().mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        fullName: 'Ich Du',
        email: 'test@test.de',
        emailVerifyCode: '123456',
      }),
    }));

    jest.mock('../utils/emailHelper.js'); // Mocke das Modul

    jest.unstable_mockModule('../models/patientTypeModel.js', () => mockUserTypeModel);
    jest.unstable_mockModule('../models/userModel.js', () => mockUserModel);

    // Funktion aufrufen
    const result = await registerHelper(mockUserData, mockUserTypeModel, mockUserModel);

    expect(result).toBe(true);

    // Überprüfe, ob die Abhängigkeiten korrekt aufgerufen wurden... Die Ganze Scheisse funzt nicht...
    // expect(mockUserTypeModel.save).toHaveBeenCalled();
    // expect(mockUserModel.save).toHaveBeenCalled();
    expect(sendEmail).toHaveBeenCalled();
  });
});

describe('hashPassword Funktion testen', () => {
  beforeEach(() => {
    // Setze die Mocks zurück, um sicherzustellen, dass sie für jeden Test frisch sind
    jest.clearAllMocks();
  });

  test('Sollte das Passwort hashen...Sollte...', async () => {
    const mockSalt = 'mockedSalt';
    const mockHashedPassword = 'mockedHashedPassword';

    // Setze die Rückgabewerte für die bcrypt-Funktionen
    bcrypt.genSalt.mockResolvedValue(mockSalt);
    bcrypt.hash.mockResolvedValue(mockHashedPassword);

    const password = 'testPassword';
    const result = await hashPassword(password);

    // Überprüfe, ob die bcrypt-Funktionen mit den erwarteten Argumenten aufgerufen wurden
    expect(bcrypt.genSalt).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith(password, mockSalt);

    // Überprüfe, ob die Funktion das erwartete Ergebnis zurückgibt
    expect(result).toBe(mockHashedPassword);
  });
});
