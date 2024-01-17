import userDoctorModel from '../models/user.doctorModel.js';
import userPatientModel from '../models/user.patientModel.js';
import { getVerifyEmailCode, registerHelper } from '../utils/authHelper.js';
import cloudinary from '../utils/cloudinary.js';
import { doctorSchema, patientSchema, validateData } from '../utils/validator.js';

export const registerUser = async (req, res) => {
  const user = req.body;

  try {
    switch (user.type) {
      case 'patient':
        {
          // Validation
          const { error, value } = validateData(user, patientSchema);

          if (error) {
            return res.status(418).json({ message: error.details[0].message });
          }

          // Database
          await registerHelper(value, userPatientModel);
        }
        break;
      case 'doctor':
        {
          // Validation
          const { error, value } = validateData(user, doctorSchema);

          if (error) {
            return res
              .status(418)
              .json({ message: 'Validierung fehlgeschlagen' + error.details[0].message });
          }

          if (req.file) {
            value.profileImage = { path: req.file.path, publicID: req.file.filename };
          }

          // Persistence
          await registerHelper(value, userDoctorModel);
        }
        break;

      default:
        throw new Error();
    }

    res.status(201).json({
      success: true,
      message: 'Sie haben eine Email mit einem Token erhalten, den Sie bitte einfügen müssen',
    });
  } catch (error) {
    // Image wieder Löschen falls vorhanden
    req.file && (await cloudinary.uploader.destroy(req.file.filename));

    return res.status(403).json({
      success: false,
      message: `Fehler bei der Registrierung ${error}`,
    });
  }
};

export const verifyUser = async (req, res) => {
  const emailVerifyCode = req.body.emailVerifyCode;
  const email = req.body.email;
  const userType = req.body.type;

  const hasEmailCode = await getVerifyEmailCode(
    (userType === 'patient' && { email, emailVerifyCode }) ||
      (userType === 'doctor' && { 'office.email': email, emailVerifyCode }),
    (userType === 'patient' && userPatientModel) || (userType === 'doctor' && userDoctorModel)
  );

  console.log(hasEmailCode);

  if (!hasEmailCode) {
    return res.status(403).json({
      success: false,
      message:
        'Registrierung fehlgeschlagen, Bitte überprüfen Sie ihren Email Code! Oder senden Sie sich einen neuen Code zu!',
    });
  }

  try {
    const update = {
      emailVerifyCode: null,
      active: true,
    };

    if (userType === 'patient') {
      await userPatientModel.findOneAndUpdate({ email }, update);
    }

    if (userType === 'doctor') {
      await userDoctorModel.findOneAndUpdate({ 'office.email': email }, update);
    }

    res.status(201).json({
      success: true,
      message: 'Sie haben sich erfolgreich registriert!',
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message:
        'Registrierung fehlgeschlagen, Bitte überprüfen Sie ihren Email Code! Oder senden Sie sich einen neuen Code zu!',
    });
  }
};

export const loginUser = async (req, res) => {
  //
};

export const getAllDoctors = async (req, res) => {
  //
};

export const findDoctorByParams = async (req, res) => {
  //
};

export const getSingleDoctor = async (req, res) => {
  //
};

export const editProfile = async (req, res) => {
  //
};
