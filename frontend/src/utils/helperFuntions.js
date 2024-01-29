import { sendData } from './fetchData';
import dentist from '../assets/images/dentist.svg';
import brain from '../assets/images/brainIcon.svg';
import genetics from '../assets/images/genetics.svg';
import radio from '../assets/images/radiologie.jpg';

export const checkLogin = async () => {
  let isLoggedIn = false;
  const response = await sendData('POST', '/api/v1/user/check-auth');

  if (response.data && response.data.success) {
    isLoggedIn = true;
  }

  return isLoggedIn;
};

export const getUserCredentials = (cookieName) => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((row) => row.trim().startsWith(cookieName + '='));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
};

export const logout = async () => {
  await sendData('POST', '/api/v1/user/logout');
};

export const getHeaderTitle = (pathname) => {
  if (pathname.startsWith('/doctor/') && pathname.includes('/new-appointment')) {
    return 'Neuer Termin';
  } else if (pathname.startsWith('/doctor/')) {
    return 'Profil';
  }

  switch (pathname) {
    case '/':
      return '';
    case '/login':
      return 'Login';
    case '/register':
      return 'Registrierung';
    case '/search-doctors':
      return 'Ärzte';
    default:
      return '';
  }
};

export const createCleanedUserState = (initialUserState, userType) => {
  const cleanedState = { ...initialUserState };

  if (userType === 'patient') {
    // Unsauber aber egal
    delete cleanedState.title;
    delete cleanedState.patientErrors;
    delete cleanedState.doctorErrors;
    delete cleanedState.errors;
    delete cleanedState.expertise;
    delete cleanedState.description;
    delete cleanedState.numberOfPatients;
    delete cleanedState.profileImage;
    delete cleanedState.workingTimeEndDay;
    delete cleanedState.workingTimeEndTime;
    delete cleanedState.workingTimeStartDay;
    delete cleanedState.workingTimeStartTime;
    delete cleanedState.verifyToken;
  }

  if (userType === 'doctor') {
    cleanedState.workingTime = JSON.stringify({
      startDay: cleanedState.workingTimeStartDay,
      endDay: cleanedState.workingTimeEndDay,
      startTime: cleanedState.workingTimeStartTime,
      endTime: cleanedState.workingTimeEndTime,
    });

    // Unsauber aber egal
    delete cleanedState.age;
    delete cleanedState.patientErrors;
    delete cleanedState.doctorErrors;
    delete cleanedState.errors;
    delete cleanedState.verifyToken;
    delete cleanedState.workingTimeStartDay;
    delete cleanedState.workingTimeEndDay;
    delete cleanedState.workingTimeStartTime;
    delete cleanedState.workingTimeEndTime;
    delete cleanedState.verifyToken;
  }

  return cleanedState;
};

export const createObject = (key, value) => {
  return { [key]: value };
};

export const getRandomPicture = () => {
  const pictures = [dentist, brain, genetics, radio];

  const randomIndex = Math.floor(Math.random() * pictures.length);
  return pictures[randomIndex];
};

export const getQueryParam = (param) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

export const ArrayToString = (arr) => {
  return arr.map((obj) => obj.title).join(', ');
};

export const buildWorkingTimeString = (obj) => {
  return `${obj.startDay.slice(0, 3)} - ${obj.endDay.slice(0, 3)} (${obj.startTime} - ${
    obj.endTime
  } )`;
};

export const queryBuilder = (params) => {
  let queryString = `?name=${encodeURIComponent(params.name)}`;
  if (params.area) {
    queryString += `&area=${encodeURIComponent(params.area)}`;
  }
  return queryString;
};
