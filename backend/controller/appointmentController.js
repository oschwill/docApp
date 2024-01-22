import appointmentModel from '../models/appointmentModel.js';
import { createDynamicAppResponseEmail, sendDynamicEmail } from '../utils/emailHelper.js';
import { convertToDateObject, convertToGermanDate } from '../utils/helperFunctions.js';

export const addNewAppointMent = async (req, res) => {
  const { docID } = req.params;
  const userData = req.body;

  try {
    const meeting = convertToDateObject(userData.year, userData.month, userData.day, userData.time);

    // Abfragen ob es bereits schon eine Terminanfrage gibt
    const appStatus = await appointmentModel.find({
      doctor: docID,
      meeting,
      patient: req.user.userId,
    });

    if (appStatus.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          'Sie haben bereits bei diesem Doktor für diese Uhrzeit eine Terminanfrage gesendet',
      });
    }

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
  const appData = req.body;

  try {
    // Ändere Termin Status
    const response = await appointmentModel
      .findOneAndUpdate({ _id: appData.appId }, { status: true })
      .populate({
        path: 'patient',
        model: 'userModel',
      })
      .populate({
        path: 'doctor',
        model: 'userModel',
        populate: {
          path: 'role',
          model: 'doctorTypeModel',
        },
      });

    if (!response) {
      throw new Error();
    }

    const emailData = {
      patient: {
        email: response.patient.email,
        fullName: await response.patient.fullName,
      },
      doctor: {
        _id: response.doctor._id,
        fullName: await response.doctor.fullName,
        street: response.doctor.role.address.street,
        houseNr: response.doctor.role.address.houseNr,
        postalCode: response.doctor.role.address.postalCode,
        city: response.doctor.role.address.city,
        phone: response.doctor.phone,
        email: response.doctor.email,
        docLink: `${appData.docLink}/${response.doctor._id}`,
      },
      meeting: response.meeting,
    };

    const assumedEmailData = createDynamicAppResponseEmail(emailData, true);

    // Genehmigungs email senden

    const hasEmailSent = await sendDynamicEmail(assumedEmailData);

    if (!hasEmailSent) {
      throw new Error();
    }

    // Email Termin Absagen senden, falls vorhanden, hole Termine mit gleichen Datum
    const secondResponse = await appointmentModel
      .find({
        meeting: response.meeting,
        doctor: response.doctor._id,
        status: false,
      })
      .populate({
        path: 'patient',
        model: 'userModel',
      });

    if (secondResponse.length > 0) {
      secondResponse.forEach(async (item) => {
        console.log(item);
        // Lösche termin
        await appointmentModel.findOneAndDelete({ _id: item._id });
        // Sende Absage Email
        emailData.patient.email = item.patient.email;
        emailData.patient.fullName = await item.patient.fullName;
        const refusedEmailData = createDynamicAppResponseEmail(emailData, false);
        await sendDynamicEmail(refusedEmailData);
      });
    }

    res.status(201).json({
      success: true,
      message: 'Der Termin wurde von Ihnen erfolgreich bestätigt',
    });

    // sende Email
  } catch (error) {
    // Transaction manuell rollbacken bei Fehler!
    await appointmentModel.findOneAndUpdate({ _id: appData.appId }, { status: false });

    res.status(400).json({
      success: false,
      message: 'Fehler beim Bestätigen des Termins, bitte bestätigen Sie den Termin erneut',
    });
  }
};

export const getReservedAppointMentByDate = async (req, res) => {
  const { year, month, day } = req.body;
  const { docID } = req.params;

  // Baue date
  const startDate = new Date(year, month, day, 0, 0, 0);
  const endDate = new Date(year, month, day, 23, 59, 59);

  // Wir holen uns die bereits belegten Termine
  const occupiedAppointment = await appointmentModel.find(
    {
      meeting: {
        $gte: startDate,
        $lt: endDate,
      },
      status: true,
      doctor: docID,
    },
    {
      meeting: 1,
      _id: 0,
    }
  );

  const returnTimeData = occupiedAppointment.map((item) =>
    convertToGermanDate(item.meeting).split(',')[1].trim()
  );

  res.status(200).json({
    success: true,
    returnTimeData,
  });
};

export const getNotApprovedAppointMentsByDoc = async (req, res) => {
  const docId = req.user.userId;

  try {
    const data = await appointmentModel.find({ doctor: docId, status: false }).populate({
      path: 'patient',
      model: 'userModel',
      select: { password: 0 },
      populate: {
        path: 'role',
        model: 'patientTypeModel',
      },
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Keine Termine gefunden',
    });
  }
};
