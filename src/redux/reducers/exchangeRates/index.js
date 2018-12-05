import { handleActions } from 'redux-actions';
import {
    setCurrencyExchangeRates,
    setLocEurRate,
    setLocRateFiatAmount
 } from '../../action/exchangeRates';

const initialState  = {
    currencyExchangeRates: null,
    locEurRate: null,
    locRateFiatAmount: 1000
};
  
export default handleActions(
    {
        [setCurrencyExchangeRates]: (state, {payload}) => {
            return { ...state, currencyExchangeRates: payload};
        },

        [setLocEurRate]: (state, {payload}) => {
            return { ...state, locEurRate: payload};
        },

        [setLocRateFiatAmount]: (state, {payload}) => {
            return { ...state, locRateFiatAmount: payload};
        },
    },
    initialState
);