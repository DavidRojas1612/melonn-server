const { format, getHours } = require('date-fns');
const { calculateMinMaxDates } = require('./calculateMinMaxDates');
const { generateBusinessDays } = require('./dates');

const PROMISE_DATES_NULL = {
  pack_promise_min: null,
  pack_promise_max: null,
  ship_promise_min: null,
  ship_promise_max: null,
  delivery_promise_min: null,
  delivery_promise_max: null,
  ready_pickup_promise_min: null,
  ready_pickup_promise_max: null
};


const calculatePromises = ({ methodDetail, listOfOffDays, sellOrder }) => {
  const dateTime = new Date();
  const dateTimeFormat = format(dateTime, 'yyyy-MM-dd');
  const nextBusinessDays = generateBusinessDays();
  const rules = methodDetail.rules;
  const now_datetime = {
    date: dateTimeFormat,
    hour: getHours(dateTime),
    isBusinessDay: !listOfOffDays.includes(dateTimeFormat)
  }

  const sellOrderWeight = sellOrder?.lineItems?.reduce((prevItem, item) => prevItem.product_weight + item);
  const minWeight = rules.availability.byWeight.min;
  const maxWeight = rules.availability.byWeight.max;

  const dayType = rules.availability.byRequestTime.dayType;
  const fromTimeOfDay = rules.availability.byRequestTime.fromTimeOfDay;
  const toTimeOfDay = rules.availability.byRequestTime.toTimeOfDay;

  const cases = rules.promisesParameters.cases;

  const sellOrderResponse = {
    ...sellOrder,
    creation_date: dateTimeFormat,
  }

  const sellOrderPromiseNull = {
    ...sellOrderResponse,
    ...PROMISE_DATES_NULL,
  }

  if(!(minWeight <= sellOrderWeight <= maxWeight)) {
    return sellOrderPromiseNull
  }

  if(dayType === 'BUSINESS' && !now_datetime.isBusinessDay) {
    return  sellOrderPromiseNull
  }

  if(!(fromTimeOfDay <= now_datetime.hour <= toTimeOfDay)) {
    return  sellOrderPromiseNull
  }

  for (let priority = 1; priority <= cases.length; priority++) {
    const caseWork = cases.find(ruleCase => ruleCase.priority === priority);
    if(!caseWork) {
      return  sellOrderPromiseNull
    }

    const dayType = caseWork.condition.byRequestTime.dayType;
    const fromTimeOfDay = caseWork.condition.byRequestTime.fromTimeOfDay;
    const toTimeOfDay = caseWork.condition.byRequestTime.toTimeOfDay;
  
    if(dayType === 'BUSINESS' && !now_datetime.isBusinessDay || !(fromTimeOfDay <= now_datetime.hour <= toTimeOfDay)) {
      break;
    }

    const packPromise = calculateMinMaxDates(caseWork.packPromise, dateTime, nextBusinessDays);
    const shipPromise = calculateMinMaxDates(caseWork.shipPromise, dateTime, nextBusinessDays);
    const deliveryPromise = calculateMinMaxDates(caseWork.deliveryPromise, dateTime, nextBusinessDays);
    const readyPickUpPromise = calculateMinMaxDates(caseWork.readyPickUpPromise, dateTime, nextBusinessDays);

    return  {
      ...sellOrderResponse,
      pack_promise_min: packPromise.min,
      pack_promise_max: packPromise.max,
      ship_promise_min: shipPromise.min,
      ship_promise_max: shipPromise.max,
      delivery_promise_min: deliveryPromise.min,
      delivery_promise_max: deliveryPromise.max,
      ready_pickup_promise_min: readyPickUpPromise.min,
      ready_pickup_promise_max: readyPickUpPromise.max
    }
  }
}

module.exports = {
  calculatePromises
}
