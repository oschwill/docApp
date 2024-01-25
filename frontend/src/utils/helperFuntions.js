export const checkLogin = () => {
  return document.cookie.indexOf('cookie_name=jwt') === 1;
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
