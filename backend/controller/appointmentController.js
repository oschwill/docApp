import appointmentModel from '../models/appointmentModel.js';
import { convertToDateObject } from '../utils/helperFunctions.js';

export const addNewAppointMent = async (req, res) => {
  const { docID } = req.params;
  const userData = req.body;

  try {
    const meeting = convertToDateObject(userData.year, userData.month, userData.day, userData.time);

    const newAppointMent = new appointmentModel({
      patient: req.user.userId,
      doctor: docID,
      meeting,
      problem: userData.problem,
    });

    const response = await newAppointMent.save();

    if (!response) {
      throw new Error();
    }

    res.status(200).json({
      success: true,
      message: 'Es wurde erfolgreich eine Terminanfrage gesendet',
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Fehler bei der Terminanfrage, bitte wiederholen Sie Ihre Aktion',
    });
  }
};

export const permitAppointMent = async (req, res) => {
  //
};

export const getReservedAppointMentByDate = async (req, res) => {
  //
};

export const getAppointMentsByDoc = async (req, res) => {
  //
};
