const { getDeltaValues } = require('./getDeltaValues');


const calculateMinMaxDates = (promise, dateTime, nextBusinessDays) => {
  const promiseCalculate = {
    min: getDeltaValues({ promise, dateTime, nextBusinessDays, type: 'min'}),
    max: getDeltaValues({ promise, dateTime, nextBusinessDays, type: 'max'}),
  }

  return promiseCalculate;
}

module.exports = {
  calculateMinMaxDates
}
