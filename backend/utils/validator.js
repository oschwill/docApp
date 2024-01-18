import Joi from 'joi';

const translator = {
  de: {
    title: 'Titel',
    firstName: 'Vorname',
    lastName: 'Nachname',
    password: 'Passwort',
    repeatPassword: 'Passwort wiederholen',
    street: 'Straße',
    houseNr: 'Hausnummer',
    postalCode: 'Postleitzahl',
    city: 'Stadt',
    phone: 'Telefonnummer',
    email: 'Email',
    age: 'Alter',
    gender: 'Geschlecht',
    workingTime: 'Arbeitszeiten',
    expertise: 'Fachkenntnisse',
  },
};

const nameErrorMessages = (keyName, optionalMessage) => {
  let returnErrorMessageObj = {
    'string.empty': `${translator.de[keyName]} darf nicht leer sein`,
    'string.min': `${translator.de[keyName]} muss mindestens {#limit} Zeichen lang sein`,
    'string.max': `${translator.de[keyName]} darf maximal {#limit} Zeichen lang sein`,
    'string.email': 'Die E-Mail-Adresse ist nicht gültig.',
    'string.base': `${translator.de[keyName]} muss eine Zeichenkette sein`,
  };

  if (optionalMessage) {
    returnErrorMessageObj = {
      ...returnErrorMessageObj,
      ...optionalMessage,
    };
  }

  return returnErrorMessageObj;
};

export const patientSchema = Joi.object({
  type: Joi.string(),
  firstName: Joi.string().min(3).max(20).required().messages(nameErrorMessages('firstName')),
  lastName: Joi.string().min(3).max(25).required().messages(nameErrorMessages('lastName')),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages(nameErrorMessages('password')),
  repeatPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .messages(
      nameErrorMessages('repeatPassword', {
        'any.only': `Passwort wiederholen ist nicht identisch mit Passwort`,
      })
    ),
  street: Joi.string().required().messages(nameErrorMessages('street')),
  houseNr: Joi.string().required().messages(nameErrorMessages('houseNr')),
  postalCode: Joi.string().required().max(5).messages(nameErrorMessages('postalCode')),
  city: Joi.string().required().messages(nameErrorMessages('city')),
  phone: Joi.string().max(15).required().messages(nameErrorMessages('phone')),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'de'] } })
    .required()
    .messages(nameErrorMessages('email')),
  age: Joi.number()
    .greater(17)
    .required()
    .messages(
      nameErrorMessages('age', {
        'number.greater': `Sie müssen mindestens 18 Jahre alt sein`,
      })
    ),
  gender: Joi.string()
    .valid('male', 'female', 'divers')
    .required()
    .messages(
      nameErrorMessages('gender', {
        'any.only': `Mögliche Geschlechterauswahl männlich, weiblich, divers`,
      })
    ),
}).with('street', 'houseNr');

export const doctorSchema = Joi.object({
  type: Joi.string(),
  title: Joi.string()
    .valid('Dr. med.', 'Dr.med.dent.', 'Dr. rer. nat.', 'Prof.')
    .required()
    .messages(nameErrorMessages('title')),
  firstName: Joi.string().min(3).max(20).required().messages(nameErrorMessages('firstName')),
  lastName: Joi.string().max(25).required().messages(nameErrorMessages('lastName')),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages(nameErrorMessages('password')),
  repeatPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .messages(
      nameErrorMessages('repeatPassword', {
        'any.only': `Passwort wiederholen ist nicht identisch mit Passwort`,
      })
    ),
  profileImage: Joi.binary().encoding('base64').allow(null, ''),
  street: Joi.string().required().messages(nameErrorMessages('street')),
  houseNr: Joi.string().required().messages(nameErrorMessages('houseNr')),
  postalCode: Joi.string().required().max(5).messages(nameErrorMessages('postalCode')),
  city: Joi.string().required().messages(nameErrorMessages('city')),
  workingTime: Joi.string().required().messages(nameErrorMessages('workingTime')),
  phone: Joi.string().max(15).required().messages(nameErrorMessages('phone')),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'de'] } })
    .required()
    .messages(nameErrorMessages('email')),
  numberOfPatients: Joi.number().allow(null, ''),
  expertise: Joi.array()
    .items(Joi.string().hex().length(24).required())
    .messages(nameErrorMessages('expertise')),
  gender: Joi.string()
    .valid('male', 'female', 'divers')
    .required()
    .messages(
      nameErrorMessages('gender', {
        'any.only': `Mögliche Geschlechterauswahl männlich, weiblich, divers`,
      })
    ),
  description: Joi.string().optional().allow(null, ''),
})
  .with('street', 'houseNr')
  .with('houseNr', 'workingTime');

export const dynamicDoctorSchema = (attributesToValidate) => {
  return Joi.object(
    Object.fromEntries(
      attributesToValidate.map((attribute) => [
        attribute,
        doctorSchema.extract(attribute).messages(nameErrorMessages(attribute)),
      ])
    )
  );
};

export const validateData = (data, cbSchema) => {
  return cbSchema.validate(data);
};
