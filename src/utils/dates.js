const {  addBusinessDays, format } = require('date-fns');


const generateBusinessDays = () => {
  const businessDays = []
  for (let index = 1; index <= 10; index++) {
    const result = format(addBusinessDays(new Date(), index), "yyyy-MM-dd");
    businessDays.push(result);
  }

  return [...businessDays]
} 

module.exports = {
  generateBusinessDays
}