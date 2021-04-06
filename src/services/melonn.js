const api = require('../config/api');

const shippingMethodDetails = id => api.get(`/shipping-methods/${id}`);
const listOfOffDays = () => api.get('/off-days');

module.exports = {
  shippingMethodDetails,
  listOfOffDays
};
