import expertiseAreaModel from '../models/expertiseAreaModel.js';

export const getAllAreas = async (_, res) => {
  // Hole uns alle Fachgebiete
  try {
    const allAreas = await expertiseAreaModel.find();

    res.status(200).json({
      success: true,
      allAreas,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Keine Fachgebiete gefunden!',
    });
  }
};
