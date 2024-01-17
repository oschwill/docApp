import 'dotenv/config';
import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (options, userType) => {
  // console.log('first');
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
    <h1>Guten Tag ${options.fullName},</h1>
    <p>Hier ist Ihr Email Verifizierungscode: <strong>${options.emailVerifyCode}</strong></p>
    <p>Bitte teilen Sie diesen Code mit Niemandem. Ihr docApp Registrierungsteam, mfg und hau rein und so!!</p>
    `;

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'mailtrap Test" <Admin@doc-app.com>', // sender address
    to: userType === 'doctor' ? options.office.email : options.email, // list of receivers
    subject: `Hallo ${options.fullName}, danke für das Registrieren auf unserer tollen App`, // Subject line
    text: `Hier ist Ihr Email Verifizierungscode: ${options.emailVerifyCode}`, // plain text body
    html, // html body
  });

  console.log('Message sent: %s', info.messageId);
};
