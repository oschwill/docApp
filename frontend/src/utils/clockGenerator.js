export const createWorkingClockTime = () => {
  let clockTime = [];
  // Erstelle Uhrzeiten von 6:30 - 20:00 Uhr
  for (let hour = 6; hour < 20; hour++) {
    let hourString = hour.toString().padStart(2, '0');
    clockTime.push(`${hourString}:30`);
    if (hour !== 18) {
      clockTime.push(`${hourString.padStart(2, '0')}:00`);
    }
  }
  return clockTime;
};

export const createDayArray = () => {
  let days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  return days;
};
