export const initialUserState = {
  title: '',
  firstName: '',
  lastName: '',
  password: '',
  repeatPassword: '',
  profileImage: '',
  street: '',
  houseNr: '',
  postalCode: '',
  city: '',
  age: '',
  phone: '',
  email: '',
  gender: '',
  workingTimeStartDay: '',
  workingTimeEndDay: '',
  workingTimeStartTime: '',
  workingTimeEndTime: '',
  numberOfPatients: '',
  expertise: [],
  description: '',
  patientErrors: {
    firstName: 'Der Vorname muss ausgefüllt sein',
    lastName: 'Der Nachname muss ausgefüllt sein',
    password: 'Das Password muss ausgefüllt sein',
    repeatPassword: 'Das Password wdh muss ausgefüllt werden',
    street: 'Die Straße muss ausgefüllt werden',
    houseNr: 'Die Hausnummer muss ausgefüllt werden',
    postalCode: 'Die Postleitzahl muss ausgefüllt werden',
    city: 'Die Stadt muss ausgefüllt werden',
    age: 'Das Alter muss ausgefüllt werden',
    phone: 'Die Telefonnummer muss ausgefüllt werden',
    email: 'Die Email Adresse muss ausgefüllt werden',
    gender: 'Das Geschlecht muss ausgefüllt werden',
  },
  doctorErrors: {
    title: 'Der Titel muss ausgefüllt werden',
    firstName: 'Der Vorname muss ausgefüllt sein',
    lastName: 'Der Nachname muss ausgefüllt sein',
    password: 'Das Password muss ausgefüllt sein',
    repeatPassword: 'Das Password wdh muss ausgefüllt werden',
    street: 'Die Straße muss ausgefüllt werden',
    houseNr: 'Die Hausnummer muss ausgefüllt werden',
    postalCode: 'Die Postleitzahl muss ausgefüllt werden',
    city: 'Die Stadt muss ausgefüllt werden',
    workingTimeStartDay: 'Der Start Tag muss ausgefüllt werden',
    workingTimeEndDay: 'Der End Tag muss ausgefüllt werden',
    workingTimeStartTime: 'Die Öffnungszeit muss ausgefüllt werden',
    workingTimeEndTime: 'Die Schließungszeit muss ausgefüllt werden',
    phone: 'Die Telefonnummer muss ausgefüllt werden',
    email: 'Die Email Adresse muss ausgefüllt werden',
    gender: 'Das Geschlecht muss ausgefüllt werden',
    expertise: 'Mindestens eine Ihrer Fachkentnisse sollten ausgefüllt werden',
  },
  verifyToken: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return { ...state, errors: action.errors };

    default:
      throw new Error();
  }
};

export const validateUserForm = (fields, type) => {
  let errors = {};

  if (type === 'patient') {
    Object.keys(initialUserState.patientErrors).forEach((fieldValue) => {
      if (!fields[fieldValue]) {
        errors[fieldValue] = initialUserState.patientErrors[fieldValue];
      }
    });
  }

  if (type === 'doctor') {
    Object.keys(initialUserState.doctorErrors).forEach((fieldValue) => {
      if (!fields[fieldValue]) {
        errors[fieldValue] = initialUserState.doctorErrors[fieldValue];
      }
    });
  }

  if (fields.password !== fields.repeatPassword) {
    errors.repeatPassword = 'Das Password wdh stimmt nicht mit dem Passwort überein';
  }

  return errors;
};
