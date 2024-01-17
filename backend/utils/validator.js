import Joi from 'joi';

const nameErrorMessages = (keyName, optionalMessage) => {
  let returnErrorMessageObj = {
    'string.empty': `${keyName} darf nicht leer sein`,
    'string.min': `${keyName} muss mindestens {#limit} Zeichen lang sein`,
    'string.max': `${keyName} darf maximal {#limit} Zeichen lang sein`,
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
  firstName: Joi.string().min(3).max(20).required().messages(nameErrorMessages('Vorname')),
  lastName: Joi.string().min(3).max(25).required().messages(nameErrorMessages('Nachname')),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages(nameErrorMessages('Passwort')),
  repeatPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .messages(
      nameErrorMessages('Passwort wiederholen', {
        'any.only': `Passwort wiederholen ist nicht identisch mit Passwort`,
      })
    ),
  street: Joi.string().required().messages(nameErrorMessages('Straße')),
  houseNr: Joi.string().required().messages(nameErrorMessages('Hausnummer')),
  phone: Joi.string().max(15).required().messages(nameErrorMessages('Telefonnummer')),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'de'] } })
    .required()
    .messages(nameErrorMessages('Email')),
  age: Joi.number().greater(17).required().messages({
    'number.greater': `Sie müssen mindestens 18 Jahre alt sein`,
  }),
  gender: Joi.string()
    .valid('male', 'female', 'divers')
    .required()
    .messages(nameErrorMessages('Geschlecht')),
}).with('street', 'houseNr');

export const doctorSchema = Joi.object({
  type: Joi.string(),
  title: Joi.string().valid('Dr. med.', 'Dr.med.dent.', 'Dr. rer. nat.', 'Prof.').required(),
  firstName: Joi.string().min(3).max(20).required().messages(nameErrorMessages('Vorname')),
  lastName: Joi.string().max(25).required().messages(nameErrorMessages('Nachname')),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages(nameErrorMessages('Passwort')),
  repeatPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .messages(
      nameErrorMessages('Passwort wiederholen', {
        'any.only': `Passwort wiederholen ist nicht identisch mit Passwort`,
      })
    ),
  profileImage: Joi.binary().encoding('base64').allow(null, ''),
  street: Joi.string().required().messages(nameErrorMessages('Straße')),
  houseNr: Joi.string().required().messages(nameErrorMessages('Hausnummer')),
  workingTime: Joi.string().required().messages(nameErrorMessages('Arbeitszeiten')),
  phone: Joi.string().max(15).required().messages(nameErrorMessages('Telefonnummer')),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'de'] } })
    .required()
    .messages(nameErrorMessages('Email')),
  numberOfPatients: Joi.number().allow(null, ''),
  expertise: Joi.array()
    .items(Joi.string().hex().length(24).required())
    .messages(nameErrorMessages('Fachkenntnisse')),
  gender: Joi.string()
    .valid('male', 'female', 'divers')
    .required()
    .messages(nameErrorMessages('Geschlecht')),
  description: Joi.string().optional().allow(null, ''),
})
  .with('street', 'houseNr')
  .with('houseNr', 'workingTime');

export const validateData = (data, cbSchema) => {
  return cbSchema.validate(data);
};
