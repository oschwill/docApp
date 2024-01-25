import express from 'express';
import { getAllAreas } from '../controller/docInformationController.js';

export const router = express.Router();

/* AUTH */
router.route('/get-all-areas').get(getAllAreas);
