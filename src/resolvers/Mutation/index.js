const melonnDBcache = require('../../data');
const melonnService = require('../../services/melonn');
const { calculatePromises } = require('../../utils/calcutalePromises');

module.exports = {
  createSellOrder: async (root, { cInput }) => {
    const newSellOrder = new melonnDBcache('orders');
    const { shipping_method, ...restOrder } = cInput;
    const resMethodDetails = await melonnService.shippingMethodDetails(shipping_method);
    const resListOfOffDays = await melonnService.listOfOffDays();
    const shippingMethodDetail = resMethodDetails.data;
    const listOfOffDays = resListOfOffDays.data;

    return new Promise((resolve, reject) => {
      try {
        const sellOrderID = newSellOrder.getValues().length + 1;
        const sellOrder = {
          id: sellOrderID,
          ...restOrder,
          shipping_method: shippingMethodDetail.name
        };
        const sellOrderCalculate = calculatePromises({ methodDetail: shippingMethodDetail, listOfOffDays, sellOrder })
        newSellOrder.save(sellOrderCalculate);
        resolve(sellOrderCalculate)
      } catch (error) {
        reject(error);
      }
    })
  }
}