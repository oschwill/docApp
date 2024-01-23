import {
  convertToDateObject,
  convertToGermanDate,
  extractAndRemoveKeys,
  flattenObject,
  removeHtmlTags,
} from '../utils/helperFunctions';

describe('extractAndRemoveKeys() Funktion testen', () => {
  test('Sollte die richtigen Schlüssel extrahieren und aus dem ursprünglichen Objekt entfernen', () => {
    const originalObject = {
      name: 'Testuser',
      age: 30,
      email: 'testuser@test.de',
      favColor: 'green',
    };

    const keysToExtract = ['name', 'email'];

    // Rufe die Funktion auf
    const extractedValues = extractAndRemoveKeys(originalObject, keysToExtract);

    // Überprüfe, ob die extrahierten Werte korrekt sind
    expect(extractedValues).toEqual({
      name: 'Testuser',
      email: 'testuser@test.de',
    });

    // Überprüfe, ob die ursprünglichen Keys aus dem Objekt entfernt wurden
    expect(originalObject).toEqual({
      age: 30,
      favColor: 'green',
    });
  });

  test('Sollte keine Schlüssel extrahieren, wenn keine Keys angegeben sind', () => {
    const originalObject = {
      name: 'Testuser',
      age: 30,
      email: 'testuser@test.de',
      favColor: 'green',
    };

    // Rufe die Funktion auf, ohne Key anzugeben
    const extractedValues = extractAndRemoveKeys(originalObject, []);

    // Überprüfe ob keine Werte extrahiert wurden und so
    expect(extractedValues).toEqual({});

    // Überprüfe ob das ursprüngliche Objekt unverändert ist
    expect(originalObject).toEqual({
      name: 'Testuser',
      age: 30,
      email: 'testuser@test.de',
      favColor: 'green',
    });
  });
});

/* TEST FLATTEN OBJECT */
describe('flattenObject() Funktion testen', () => {
  test('Sollte ein verschachteltes Objekt in ein flaches Objekt umwandeln', () => {
    // Erstelle ein Beispiel-Objekt mit verschachtelten Eigenschaften
    const nestedObject = {
      name: 'Testuser',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Example City',
        postalCode: '12345',
      },
      hobbies: ['gaming', 'coding'],
    };

    const flattenedObject = flattenObject(nestedObject);

    // Überprüfe ob das Objekt richtig in ein flaches Objekt umgewandelt wurde
    expect(flattenedObject).toEqual({
      name: 'Testuser',
      age: 30,
      'address.street': '123 Main St',
      'address.city': 'Example City',
      'address.postalCode': '12345',
      hobbies: ['gaming', 'coding'],
    });
  });

  test('Sollte mit leeren verschachtelten Objecten und Arrays umgehen können', () => {
    const nestedObject = {
      name: 'Testuser',
      age: 30,
      address: {},
      hobbies: [],
    };

    // Rufe die Funktion auf
    const flattenedObject = flattenObject(nestedObject);

    // Überprüfe ob das Objekt richtig in ein flatten Objekt umgewandelt wurde
    expect(flattenedObject).toEqual({
      name: 'Testuser',
      age: 30,
      'address.street': undefined,
      'address.city': undefined,
      'address.postalCode': undefined,
      hobbies: [],
    });
  });

  test('Sollte mit leeren input Objects umgehen können', () => {
    // Rufe die Funktion auf mit einem leeren Objekt
    const flattenedObject = flattenObject({});

    // Überprüfe ob das Ergebnis ebenfalls ein leeres Objekt ist
    expect(flattenedObject).toEqual({});
  });
});

/* TEST DATUM OBJEKT KONVERTIERUNG */
describe('convertToDateObject() Funktion testen', () => {
  test('Sollte ein gültiges Datum-Objekt zurückgeben...', () => {
    const year = 2023;
    const month = 6; // Juli
    const day = 15;
    const time = '12:30';

    // Rufe die Funktion auf
    const result = convertToDateObject(year, month, day, time);

    // Erstelle Datums obj
    const expectedDate = new Date(2023, 6, 15, 12, 30);

    // Überprüfe ob das zurückgegebene Datum-Objekt mit result übereinstimmt
    expect(result).toEqual(expectedDate);
  });

  test('Sollte mit ungültigen Datumseingaben umgehen können', () => {
    const result = convertToDateObject('invalid', 'month', 'day', 'abc');

    // Solte Invalid Date zurück geben
    expect(result.toString()).toBe('Invalid Date');
  });

  test('Sollte mit leeren Eingabezeiten umgehen können', () => {
    const year = 2023;
    const month = 6;
    const day = 15;
    const time = '';

    // Rufe die Funktion auf
    const result = convertToDateObject(year, month, day, time);

    const expectedDate = new Date(2023, 6, 15, 0, 0);

    // Überprüfe ob das zurückgegebene Date Obj mit result übereinstimmt
    expect(result).toEqual(expectedDate);
  });
});

/* TEST KONVERTIERUNG IN EIN DEUTSCHES DATUMSFORMAT */
describe('convertToGermanDate() Funktion testen', () => {
  test('Sollte ein Datum im deutschen Format zurückgeben', () => {
    const exampleDate = new Date(2023, 6, 15, 12, 30);

    // Rufe die Funktion auf
    const result = convertToGermanDate(exampleDate);

    // Erstelle das erwartete deutsche Datumsformat
    const expectedDateFormat = '15.07.2023, 12:30';

    // Überprüfe ob es übereinstimmt
    expect(result).toEqual(expectedDateFormat);
  });

  test('Sollte mit ungültigen Datumseingaben umgehen können', () => {
    const result = convertToGermanDate(null);

    // Überprüfe das result auf undefined
    expect(result).toBe(undefined);
  });

  test('Sollte mit einem leeren Datum umgehen können', () => {
    const result = convertToGermanDate(new Date(NaN));

    // Überprüfe das result Invalid Date ist
    expect(result).toBe('Invalid Date');
  });
});

/* TEST REMOVE HTML TAGS */
describe('removeHtmlTags() Funktion testen', () => {
  test('Sollte HTML Elemtne aus dem String entfernen', () => {
    const htmlStringObject = '<div><h1>Hallo Welt</><p>Dies ist ein Test</p></div>';

    const removedHtmlTags = removeHtmlTags(htmlStringObject);

    expect(removedHtmlTags).toEqual('Hallo WeltDies ist ein Test');
  });
});
