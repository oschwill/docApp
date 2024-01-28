import { createCookie, createToken } from '../middleware/token.js';
import bcrypt from 'bcrypt';
import {
  ResetEmailVerifyToken,
  getVerifyEmailCode,
  registerHelper,
  updatePassword,
} from '../utils/authHelper.js';
import cloudinary from '../utils/cloudinary.js';
import {
  doctorSchema,
  dynamicDoctorSchema,
  patientSchema,
  validateData,
} from '../utils/validator.js';
import patientTypeModel from '../models/patientTypeModel.js';
import userModel from '../models/userModel.js';
import doctorTypeModel from '../models/doctorTypeModel.js';
import {
  extractAndRemoveKeys,
  flattenKeys,
  flattenObject,
  getFullName,
  updateUserProfile,
} from '../utils/helperFunctions.js';
import mongoose from 'mongoose';

export const registerUser = async (req, res) => {
  const user = req.body;

  console.log(user);

  try {
    switch (user.type) {
      case 'patient':
        {
          // Validation
          const { error, value } = validateData(user, patientSchema);

          if (error) {
            return res
              .status(418)
              .json({ path: error.details[0].path, message: error.details[0].message });
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
              .json({ path: error.details[0].path, message: error.details[0].message });
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

    const errorParts = error.message.split(':');
    const errorMessage = errorParts[errorParts.length - 1].trim();
    return res.status(403).json({
      success: false,
      message: `Fehler bei der Registrierung: ${errorMessage}`,
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
    let user = await userModel.findOne({ email: req.body.email, active: true }).exec();

    if (!user) {
      throw new Error();
    }

    const userAuthData = {
      userId: user._id,
      email: user.email,
      type: user.userType,
      fullName: await user.fullName,
    };

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

export const refreshEmailVerifyToken = async (req, res) => {
  const { email } = req.body;

  try {
    // checken ob der user schon vorhanden ist
    const response = await userModel.findOne({ email, active: false }).exec();

    if (!response) {
      throw new Error();
    }

    const hasSend = await ResetEmailVerifyToken(response, userModel);

    if (!hasSend) {
      throw new Error();
    }

    res.status(201).json({
      success: true,
      message: 'Es wurde Ihnen ein neuer Token zugesendet!',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Der Benutzer ist nicht vorhanden, bitte registrieren Sie sich vorher',
    });
  }
};

export const changePassword = async (req, res) => {
  const { email, oldPassword, password, repeatPassword } = req.body;

  try {
    const user = await userModel.findOne({ email, active: true }).exec();

    // altes pw comparen
    if ((await bcrypt.compare(oldPassword, user.password)) && password === repeatPassword) {
      const response = await updatePassword(user._id, password, userModel);

      if (!response) {
        throw new Error();
      }

      return res.status(201).json({
        success: true,
        message: 'Das Password wurde erfolgreich geändert!',
      });
    }

    throw new Error();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Es ist ein unerwarteter Fehler aufgetreten!',
      stack: error.stack,
    });
  }
};

export const getAllDoctors = async (_, res) => {
  try {
    const doctors = await userModel
      .find({ userType: 'doctor', active: true })
      .populate({
        path: 'role',
        model: 'doctorTypeModel',
        populate: {
          path: 'expertise.area',
          model: 'expertiseAreaModel',
        },
      })
      .lean(); // Umwandeln in js obj

    // Da wir hier nicht auf den virtual await können, weil keine gute Praxis
    // ist holen wir nochmal den fullName über eine Helper function getFullName
    for (let doctor of doctors) {
      doctor.fullName = await getFullName(doctor, doctorTypeModel);
      doctor.role.expertise = doctor.role.expertise.map((item) => item.area);
    }

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Fehler beim Holen der Daten!',
    });
  }
};

export const findDoctorByParams = async (req, res) => {
  try {
    const { name, area, city } = req.query;

    // Wir bauen uns nun eine Aggregation Filter PipeLine auf
    const pipeline = [];
    const doctorTypePipeLine = [];

    pipeline.push({
      $match: {
        userType: 'doctor',
        active: true,
      },
    });

    /* WIR PUSHEN DIE FILTER IN DIE PIPELINE */
    // name filter / Eingabe ist nicht eindeutig daher arbeiten wir mit regex
    if (name !== null && name !== undefined) {
      pipeline.push({
        $match: {
          $expr: {
            $or: [
              { $regexMatch: { input: '$firstName', regex: `^${name}`, options: 'i' } },
              { $regexMatch: { input: '$lastName', regex: `^${name}`, options: 'i' } },
              {
                $regexMatch: {
                  input: { $concat: ['$firstName', ' ', '$lastName'] },
                  regex: `.*${name}.*`,
                  options: 'i',
                },
              },
            ],
          },
        },
      });
    }

    // Filter für Fachkraft
    if (area !== null && area !== undefined) {
      doctorTypePipeLine.push({
        $match: {
          expertise: {
            $elemMatch: {
              area: new mongoose.Types.ObjectId(area),
            },
          },
        },
      });
    }

    // Filter für Stadt
    if (city !== null && city !== undefined) {
      doctorTypePipeLine.push({
        $match: {
          'address.city': { $regex: `.*${city}.*`, $options: 'i' },
        },
      });
    }

    // Lookup
    pipeline.push({
      $lookup: {
        from: 'doctorType',
        localField: 'role',
        foreignField: '_id',
        pipeline: doctorTypePipeLine,
        as: 'doctorData',
      },
    });

    pipeline.push(
      {
        $addFields: {
          hasDoctorData: {
            $cond: {
              if: { $ne: ['$doctorData', []] },
              then: true,
              else: false,
            },
          },
          fullName: {
            $cond: {
              if: { $eq: ['$userType', 'doctor'] },
              then: {
                $concat: [
                  { $arrayElemAt: ['$doctorData.title', 0] },
                  ' ',
                  '$firstName',
                  ' ',
                  '$lastName',
                ],
              },
              else: 'Nicht verfügbar',
            },
          },
        },
      },
      {
        $match: {
          hasDoctorData: true,
        },
      },
      {
        $project: {
          hasDoctorData: 0,
        },
      }
    );

    // EXPERTISE SICHTBAR MACHEN
    pipeline.push({
      $lookup: {
        from: 'expertiseArea',
        localField: 'doctorData.expertise.area',
        foreignField: '_id',
        as: 'expertiseData',
      },
    });

    // console.log('City:', city);
    // console.log('Pipeline:', JSON.stringify(pipeline, null, 2));

    const doctors = await userModel.aggregate(pipeline);

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Keine Doktoren gefunden!',
    });
  }
};

export const getSingleDoctor = async (req, res) => {
  try {
    const { docID } = req.params;

    const doctor = await userModel
      .findById({ _id: docID, active: true }, { password: 0 })
      .populate({
        path: 'role',
        model: 'doctorTypeModel',
        populate: {
          path: 'expertise.area',
          model: 'expertiseAreaModel',
        },
      })
      .lean();

    doctor.fullName = await getFullName(doctor, doctorTypeModel);
    doctor.role.expertise = doctor.role.expertise.map((item) => item.area);

    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Fehler beim Holen der Daten!',
    });
  }
};

export const editProfile = async (req, res) => {
  const user = req.body;

  try {
    // Wir flatten erstmal unser obj
    const flatObj = flattenKeys(flattenObject(user));

    // Erzeuge dynamische Attribute für Joi aus unseren user keys
    const dynamicJoiAttr = Object.keys(flatObj);

    // Erzeuge dann ein dynamisches Schema daraus
    const dynamicSchema = dynamicDoctorSchema(dynamicJoiAttr);

    // Validierung
    const { error } = validateData(flatObj, dynamicSchema);

    if (error) {
      return res.status(418).json({ message: error.details[0].message });
    }
    // Nun extrahieren wir die type Daten von den UserDaten anhand der Keys und löschen sie
    // Damit wir zwei Datensätze für das userModel und für den doctorTypeModel bekommen
    const extractKeys = [
      'title',
      'profileImage',
      'address',
      'workingTime',
      'numberOfPatients',
      'expertise',
      'description',
    ];

    const doctorTypeData = extractAndRemoveKeys(user, extractKeys);

    // Nun updaten wir noch die Collections
    const response = await updateUserProfile(
      user,
      flattenObject(doctorTypeData),
      userModel,
      doctorTypeModel
    );

    if (!response) {
      throw new Error();
    }

    res.status(201).json({
      success: true,
      message: 'Die Profildaten wurden erfolgreich geupdated',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Fehler beim editieren Ihrer Daten!',
    });
  }
};

export const getPatientDataForFormular = async (req, res) => {
  const { userId } = req.user;

  try {
    const patientData = await userModel
      .findById({ _id: userId, active: true }, { password: 0 })
      .populate({
        path: 'role',
        model: 'patientTypeModel',
      });

    if (!patientData) {
      throw new Error();
    }

    res.status(200).json({
      success: true,
      patientData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Fehler beim Holen der Patienten Daten, bitte kontaktieren Sie unseren Admin',
    });
  }
};

export const logOutUser = async (req, res) => {
  res.cookie('auth', '', { expires: new Date(0), path: '/', httpOnly: true, secure: true });
  res.cookie('fullName', '', { expires: new Date(0), path: '/' });
  res.cookie('email', '', { expires: new Date(0), path: '/' });
  res.send('Logged out');
};

export const checkAuth = async (req, res) => {
  if (req.user) {
    return res.status(200).json({
      success: true,
    });
  }

  return res.status(200).json({
    success: false,
  });
};
