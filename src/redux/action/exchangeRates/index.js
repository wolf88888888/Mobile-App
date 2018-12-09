import { createAction } from 'redux-actions';
import requester from '../../../initDependencies';

const exchangeRatesInfoType = {
    SET_CURRENCY_EXCHANGE_RATES: 'SET_CURRENCY_EXCHANGE_RATES',
    SET_LOC_EUR_RATE: 'SET_LOC_EUR_RATE',
    SET_LOC_RATE_FIAT_AMOUNT: 'SET_LOC_RATE_FIAT_AMOUNT',
};

export const setCurrencyExchangeRates = createAction(exchangeRatesInfoType.SET_CURRENCY_EXCHANGE_RATES);
export const setLocEurRate = createAction(exchangeRatesInfoType.SET_LOC_EUR_RATE);
export const setLocRateFiatAmount = createAction(exchangeRatesInfoType.SET_LOC_RATE_FIAT_AMOUNT);

export const getCurrencyRates = () => {
    return dispatch => {
        requester.getCurrencyRates().then(res => {
            res.body.then(currencyExchangeRates => {
                dispatch(setCurrencyExchangeRates(currencyExchangeRates));
            });
        });
    }
};


export const getLocRate = (baseCurrency) => {
    return dispatch => {
        requester.getLocRateByCurrency(baseCurrency).then(res => {
            res.body.then(data => {
                console.log("getLocRate", data);
                dispatch(setLocEurRate(Number(data[0][`price_${(baseCurrency).toLowerCase()}`])));
            });
        });
    }
}