const api = require('../config/api');

const shippingMethodDetails = id => api.get(`/shipping-methods/${id}`);
const listOfOffDays = () => api.get('/off-days');
const shippingMethods = ()=> api.get('/shipping-methods');

module.exports = {
  shippingMethodDetails,
  listOfOffDays,
  shippingMethods
};
