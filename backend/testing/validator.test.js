import { doctorSchema, dynamicDoctorSchema, validateData } from '../utils/validator.js';

describe('doctorSchema Validierung testen', () => {
  test('Sollte ein gültiges Schema für einen Doc definieren', () => {
    const testData = {
      type: 'doctor',
      title: 'Dr. med.',
      firstName: 'Manfred',
      lastName: 'Melone',
      password: 'test123',
      repeatPassword: 'test123',
      profileImage: null,
      street: 'test Street',
      houseNr: '42',
      postalCode: '12345',
      city: 'test City',
      workingTime: JSON.stringify({
        startDay: 'Montag',
        endDay: 'Freitag',
        startTime: 8,
        endTime: 18,
      }),
      phone: '123456789',
      email: 'test@test.com',
      numberOfPatients: 1500,
      expertise: ['65a99031c9f4cf060e9a035f', '65a99031c9f4cf060e9a0360'],
      gender: 'male',
      description: 'test description',
    };

    // Überprüfe ob testData das Joi Schema erfüllt
    const validationResult = validateData(testData, doctorSchema);

    // Überprüfe ob die Validierung erfolgreich war
    expect(validationResult.error).toBeUndefined();
  });

  test('Die Schema Validierung sollte fehlschlagen', () => {
    const invalidData = {
      type: 'invalidType',
      title: 'InvalidTitle',
      firstName: 'a',
    };

    // Überprüfe, ob das ungültige Beispiel-Datenobjekt das Joi-Schema nicht erfüllt
    const validationResult = validateData(invalidData, doctorSchema);

    // Überprüfe, ob die Validierung fehlerhaft ist
    expect(validationResult.error).toBeDefined();
  });
});

describe('dynamicDoctorSchema Validierung testen', () => {
  test('Sollte ein dynamisches Schema für Arzt Profile Änderung erstellen', () => {
    const attributesToValidate = ['firstName', 'lastName', 'email'];

    // Erstelle das dynamische Schema
    const dynamicSchema = dynamicDoctorSchema(attributesToValidate);

    const exampleData = {
      firstName: 'Otto',
      lastName: 'Schnösel',
      email: 'schnoesel@test.com',
    };

    // Validieren
    const validationResult = dynamicSchema.validate(exampleData);

    // Überprüfe ob die Validierung erfolgreich ist / error sollte undefined sein
    expect(validationResult.error).toBeUndefined();
  });
});
