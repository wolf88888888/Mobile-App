import { createAction } from 'redux-actions';

const exchangeRatesInfoType = {
    SET_CURRENCY_EXCHANGE_RATES: 'SET_CURRENCY_EXCHANGE_RATES',
    SET_LOC_EUR_RATE: 'SET_LOC_EUR_RATE',
    SET_LOC_RATE_FIAT_AMOUNT: 'SET_LOC_RATE_FIAT_AMOUNT',
};

export const setCurrencyExchangeRates = createAction(exchangeRatesInfoType.SET_CURRENCY_EXCHANGE_RATES);
export const setLocEurRate = createAction(exchangeRatesInfoType.SET_LOC_EUR_RATE);
export const setLocRateFiatAmount = createAction(exchangeRatesInfoType.SET_LOC_RATE_FIAT_AMOUNT);