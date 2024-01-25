export const createWorkingClockTime = () => {
  let clockTime = [];

  for (let hour = 6; hour <= 19; hour++) {
    let hourString = hour.toString().padStart(2, '0');
    clockTime.push(`${hourString}:00`);
    if (hour !== 19) {
      clockTime.push(`${hourString}:30`);
    }
  }
  return clockTime;
};

export const createDayArray = () => {
  let days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  return days;
};
