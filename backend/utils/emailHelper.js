import 'dotenv/config';
import nodemailer from 'nodemailer';
import { convertToGermanDate, removeHtmlTags } from './helperFunctions.js';

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const html = `
    <h1>Guten Tag ${await options.fullName},</h1>
    <p>Hier ist Ihr Email Verifizierungscode: <strong>${options.emailVerifyCode}</strong></p>
    <p>Bitte teilen Sie diesen Code mit Niemandem. Ihr docApp Registrierungsteam, mfg und hau rein und so!!</p>
    `;

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'mailtrap Test" <Admin@doc-app.com>',
    to: options.email,
    subject: `Hallo ${await options.fullName}, danke für das Registrieren auf unserer tollen App`, // Subject line
    text: `Hier ist Ihr Email Verifizierungscode: ${options.emailVerifyCode}`,
    html, // html body
  });

  console.log('Message sent: %s', info.messageId);
};

export const sendDynamicEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: 'mailtrap Test" <Admin@doc-app.com>',
    to: options.email,
    subject: options.subject,
    text: options.text(), // plain text body
    html: options.html, // html body
  });

  console.log('Message sent: %s', info.messageId);

  return true;
};

export const createDynamicAppResponseEmail = (data, approved) => {
  if (approved) {
    return {
      email: data.patient.email,
      subject: `Hallo ${data.patient.fullName}, Ihr Arzt Termin wurde bestätigt`,
      html: `<h1>Hallo ${data.patient.fullName},</h1> <p>Ihr Termin für den ${convertToGermanDate(
        data.meeting
      )} Uhr wurde bestätigt.</p><p>Bitte seien Sie ca. 15 Minuten vor Terminbeginn an folgender Adresse:</p>
      <p>Arzt: ${data.doctor.fullName} </p>
      <p>Straße: ${data.doctor.street}</p>
      <p>Hausnummer: ${data.doctor.houseNr}</p>
      <p>PLZ: ${data.doctor.postalCode}</p>
      <p>Stadt: ${data.doctor.city}</p>
      <p>Telefon: ${data.doctor.phone}</p>
      <p>Email: ${data.doctor.email}</p>
      <br/>
      <p>Mit freundlichen Grüßen, <br/>Ihr docApp Team</p>
      `,
      text: function () {
        return removeHtmlTags(this.html);
      },
    };
  } else {
    return {
      email: data.patient.email,
      subject: `Hallo ${data.patient.fullName}, Ihr Arzt Termin wurde abgelehnt`,
      html: `<h1>Hallo ${data.patient.fullName},</h1> <p>Ihr Termin für den ${convertToGermanDate(
        data.meeting
      )} wurde abgelehnt.</p><p>Bitte vereinbaren Sie mit der Praxis einen neuen Termin unter: ${
        data.doctor.docLink
      }
       einen neuen Termin</p>      
      <p>Mit freundlichen Grüßen, <br/>Ihr docApp Team</p>        
      `,
      text: function () {
        return removeHtmlTags(this.html);
      },
    };
  }
};
