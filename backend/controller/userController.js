import { createCookie, createToken } from '../middleware/token.js';
import bcrypt from 'bcrypt';
import { getVerifyEmailCode, registerHelper } from '../utils/authHelper.js';
import cloudinary from '../utils/cloudinary.js';
import { doctorSchema, patientSchema, validateData } from '../utils/validator.js';
import patientTypeModel from '../models/patientTypeModel.js';
import userModel from '../models/userModel.js';
import doctorTypeModel from '../models/doctorTypeModel.js';

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
          const response = await registerHelper(value, patientTypeModel, userModel);

          if (!response) {
            throw new Error();
          }
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
          const response = await registerHelper(value, doctorTypeModel, userModel);

          if (!response) {
            throw new Error();
          }
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

  try {
    const hasEmailCode = await getVerifyEmailCode({ email, emailVerifyCode }, userModel);

    if (!hasEmailCode) {
      throw new Error();
    }

    const update = {
      emailVerifyCode: null,
      active: true,
    };

    const response = await userModel.findOneAndUpdate({ email }, update);

    if (!response) {
      throw new Error();
    }

    res.status(201).json({
      success: true,
      message: 'Sie haben sich erfolgreich registriert!',
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message:
        'Registrierung fehlgeschlagen, Bitte überprüfen Sie ihren Email Code! Oder senden Sie sich einen neuen Code zu!',
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    // Suche User in Patienten Model
    let user = await userPatientModel.findOne({ email: req.body.email, active: true }).exec();

    // Wenn nihct vorhanden dann suche in Doktor
    user =
      user === null
        ? await userDoctorModel.findOne({ 'office.email': req.body.email, active: true }).exec()
        : user;

    if (!user) {
      throw new Error();
    }

    const userAuthData =
      user.userType === 'patient'
        ? { userId: user_id, email: user.email, type: user.userType, fullName: user.fullName }
        : user.userType === 'doctor'
        ? {
            userId: user_id,
            email: user.office.email,
            type: user.userType,
            fullName: user.fullName,
          }
        : null;

    if (!userAuthData) {
      throw new Error();
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      const authToken = createToken(userAuthData);

      if (!authToken) {
        throw new Error();
      }

      // Login / create cookie
      createCookie(authToken, res, userAuthData);

      return res.status(200).json({
        success: true,
        message: 'Login erfolgreich',
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    // Schmeiße Error
    return res.status(401).json({
      success: false,
      message: 'Login Fehlgeschlagen',
    });
  }
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
