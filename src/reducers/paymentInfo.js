import { paymentInfo } from '../actions/actionTypes';
import { AsyncStorage } from 'react-native';

const initialState = {
    currency: 'USD',
    currencySign: '$',
    locRate: null
};

AsyncStorage.getItem('currency', (err, result) => {
  if (result) initialState.currency = result;
  if (err) console.log(`Error accessing AsyncStorage: ${err}`);
});

AsyncStorage.getItem('currencySign', (err, result) => {
  if (result) initialState.currencySign = result;
  if (err) console.log(`Error accessing AsyncStorage: ${err}`);
});

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case paymentInfo.SET_CURRENCY:
      AsyncStorage.setItem('currency', action.currency);
      AsyncStorage.setItem('currencySign', getCurrencySign(action.currency));
      return {
        ...state,
        currency: action.currency,
        currencySign: getCurrencySign(action.currency)
      };

    case paymentInfo.SET_LOC_RATE:
      return {
        ...state,
        locRate: action.locRate
      };

    default:
      return state;
  }
}

function getCurrencySign(currency) {
  let currencySign = '$';
  if (currency === 'GBP') currencySign = '£';
  if (currency === 'EUR') currencySign = '€';
  return currencySign;
}