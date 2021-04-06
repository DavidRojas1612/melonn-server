const { addHours, add, parseISO } = require('date-fns');

const getDeltaValues = ({ promise, type, dateTime, nextBusinessDays }) => {
  switch (promise[type].type) {
    case 'DELTA-HOURS':
      const deltaHours = promise[type].deltaHours;
      const promiseDeltaHour = addHours(dateTime, deltaHours).toUTCString();
      return promiseDeltaHour;
  
    case 'DELTA-BUSINESSDAYS':
      const deltaBusinessDays = promise[type].deltaBusinessDays;
      const timeOfDay = promise[type].timeOfDay;
      const date = nextBusinessDays[deltaBusinessDays - 1];
      const promiseDeltaBusinessDays = new Date(add(parseISO(date), { hours: timeOfDay })).toUTCString();
      return promiseDeltaBusinessDays;
  
    default:
      return null
  }
}

module.exports = {
  getDeltaValues
};
