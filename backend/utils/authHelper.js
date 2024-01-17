import bcrypt from 'bcrypt';
import { sendEmail } from './emailHelper.js';

export const registerHelper = async (userData, dataModel) => {
  let newUser;
  const emailVerifyCode = Math.random().toString().slice(2, 8);

  // Erstellen der Data Models
  if (userData.type === 'patient') {
    newUser = new dataModel({
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: await hashPassword(userData.password),
      address: {
        street: userData.street,
        houseNr: userData.houseNr,
      },
      phone: userData.phone,
      email: userData.email,
      age: userData.age,
      gender: userData.gender,
      emailVerifyCode,
    });
  }

  if (userData.type === 'doctor') {
    const docExp = userData?.expertise.map((expert) => ({ area: expert }));

    newUser = new dataModel({
      title: userData.title,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: await hashPassword(userData.password),
      profileImage: userData.profileImage ? userData.profileImage : null,
      office: {
        street: userData.street,
        houseNr: userData.houseNr,
        workingTime: JSON.parse(userData.workingTime),
        phone: userData.phone,
        email: userData.email,
        numberOfPatients: userData.numberOfPatients ? userData.numberOfPatients : null,
      },
      expertise: docExp,
      gender: userData.gender,
      description: userData.description ? userData.description : null,
      emailVerifyCode,
    });
  }

  // Database Save
  const response = await newUser.save();

  console.log(response);
  // Email versenden
  await sendEmail(response, userData.type);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const getVerifyEmailCode = async (check, dataModel) => {
  return await dataModel.findOne(check, { emailVerifyCode: 1, _id: 0 });
};

export const ResetEmailVerifyToken = () => {
  const emailVerifyCode = Math.random().toString().slice(2, 8);

  // DataBase

  // Email versenden
};
