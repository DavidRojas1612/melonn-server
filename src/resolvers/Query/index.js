const melonnDBcache =  require('../../data');

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
  }
}