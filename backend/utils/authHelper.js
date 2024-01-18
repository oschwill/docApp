import bcrypt from 'bcrypt';
import { sendEmail } from './emailHelper.js';

export const registerHelper = async (userData, userTypeModel, userModel) => {
  let userTypeRes;
  const emailVerifyCode = Math.random().toString().slice(2, 8);

  // Erstellen der Data Models
  if (userData.type === 'patient') {
    const userType = new userTypeModel({
      address: {
        street: userData.street,
        houseNr: userData.houseNr,
        postalCode: userData.postalCode,
        city: userData.city,
      },
      age: userData.age,
    });

    userTypeRes = await userType.save();

    if (!userTypeRes) {
      return null;
    }
  }

  if (userData.type === 'doctor') {
    const docExp = userData?.expertise.map((expert) => ({ area: expert }));

    const userType = userTypeModel({
      title: userData.title,
      profileImage: userData.profileImage ? userData.profileImage : null,
      address: {
        street: userData.street,
        houseNr: userData.houseNr,
        postalCode: userData.postalCode,
        city: userData.city,
      },
      workingTime: JSON.parse(userData.workingTime),
      numberOfPatients: userData.numberOfPatients ? userData.numberOfPatients : null,
      expertise: docExp,
      description: userData.description ? userData.description : null,
    });

    userTypeRes = await userType.save();

    if (!userTypeRes) {
      return null;
    }
  }

  // User Anlegen
  const newUser = new userModel({
    userType: userData.type,
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: await hashPassword(userData.password),
    role: userTypeRes,
    phone: userData.phone,
    email: userData.email,
    age: userData.age,
    gender: userData.gender,
    emailVerifyCode,
  });

  // Database Save
  const response = await newUser.save();

  if (!response) {
    console.log('first');
    return null;
  }

  // Email versenden
  await sendEmail(response);

  return true;
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
