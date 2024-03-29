import express from 'express';
import { rateLimit } from 'express-rate-limit';
import {
  changePassword,
  checkAuth,
  editProfile,
  findDoctorByParams,
  getAllDoctors,
  getPatientDataForFormular,
  getSingleDoctor,
  logOutUser,
  loginUser,
  refreshEmailVerifyToken,
  registerUser,
  verifyUser,
} from '../controller/userController.js';
import { avoidQueryParams } from '../middleware/hppPollution.js';
import { profileParser } from '../utils/cloudinary.js';
import { verifyToken } from '../middleware/token.js';

export const router = express.Router();

// refresh Email Token limit einbauen, damit der User nicht durchgehend neu sendet
export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // alle 1 Minute darf gesendet werden!
  max: 1,
  message: (req) => {
    return {
      success: false,
      message:
        'Zu viele Anfragen von dieser IP, bitte versuchen Sie es später erneut. Und checken Sie Ihre Email Adresse',
    };
  },
});

/* AUTH */
router.route('/user/register').post(profileParser.single('profileImage'), registerUser);
router.route('/user/verify').patch(verifyUser);
router.route('/user/login').post(profileParser.none(), loginUser);
router.route('/user/resendEmailToken').post(limiter, refreshEmailVerifyToken);
router.route('/user/logout').post(verifyToken, logOutUser);
router.route('/user/check-auth').post(verifyToken, checkAuth);

/* PROFILE */
router.route('/user/doctor/profile').put(profileParser.single('profileImage'), editProfile);
router.route('/user/doctor/changePassword').patch(changePassword);

/* FIND */
router.route('/user/all-doctors').get(getAllDoctors);
router.route('/user/doctor/:docID').get(getSingleDoctor);

/* FILTER */
router.route('/user/doctors').get(avoidQueryParams, findDoctorByParams);

/* APPOINTMENT FORM FILL */
router.route('/user/patient').get(verifyToken, getPatientDataForFormular);
