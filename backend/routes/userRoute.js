import express from 'express';
import {
  editProfile,
  findDoctorByParams,
  getAllDoctors,
  getSingleDoctor,
  registerUser,
  verifyUser,
} from '../controller/userController.js';
import { avoidQueryParams } from '../middleware/hppPollution.js';
import { profileParser } from '../utils/cloudinary.js';

export const router = express.Router();

// HPP Whitelist
const hppWhitelist = ['lastName', 'expertise.area'];

/* AUTH */
router.route('/user/register').post(profileParser.single('profileImage'), registerUser);
router.route('/user/verify').patch(verifyUser);
router.route('/user/login').post(registerUser);

/* PROFILE */
router.route('/user/doctor/profile').put(profileParser.single('profileImage'), editProfile);

/* FIND */
router.route('/user/all-doctors').get(getAllDoctors);
router.route('/user/surgery/:id').get(getSingleDoctor);
router.route('/user/doctors').get(avoidQueryParams, findDoctorByParams);
