const melonnDBcache =  require('../../data');
const melonnService = require('../../services/melonn');

module.exports = {
  getSellOrders: (root, { id }) => {
    const orders = new melonnDBcache('orders')
    if (id) {
      return new Promise((resolve) => {
        resolve(orders.getById(id))
      })
    } else {
      return orders.getValues();
    }
  },
  getShippingMethods: async() => {
    const methods = await melonnService.shippingMethods();
    const MethodsResponse = methods.data;

    return new Promise((resolve, reject) => {
      if(MethodsResponse) {
        return resolve(MethodsResponse)
      }
      else {
        reject('Error system')
      }
    })
  }
}