import dateFormat from 'dateformat';

const checkForMonday = (holiday) => {
  const day = new Date(holiday).getDay();
  if (day === 1) {
    return true;
  }
  return false;
}

const checkForFriday = (holiday) => {
  const day = new Date(holiday).getDay();
  if (day === 5) {
    return true;
  }
  return false;
}

const checkForTuesday = (holiday, holidays) => {
  const day = new Date(holiday).getDay();
  if (day === 2) {
    const mondayBefore = new Date(holiday);
    mondayBefore.setDate(mondayBefore.getDate() - 1);
    if (holidays.includes(mondayBefore.getTime())) {
      return true;
    }

    const fridayBefore = new Date(holiday);
    fridayBefore.setDate(fridayBefore.getDate() - 4);
    if (holidays.includes(fridayBefore.getTime())) {
      return true;
    }
  }
  return false;
}

const checkForThursday = (holiday, holidays) => {
  const day = new Date(holiday).getDay();
  if (day === 4) {
    const mondayAfter = new Date(holiday);
    mondayAfter.setDate(mondayAfter.getDate() + 4);
    if (holidays.includes(mondayAfter)) {
      return true;
    }
  }
  return false;
}

export const Rules = [
  checkForMonday,
  checkForFriday,
  checkForTuesday,
]