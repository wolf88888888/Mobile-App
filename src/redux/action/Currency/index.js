import { createAction } from 'redux-actions';
import requester from '../../../initDependencies';

const currencyInfo = {
    SET_LOC_PRICE_WEBSOCKET_CONNECTION: 'SET_LOC_PRICE_WEBSOCKET_CONNECTION',
    SET_CURRENCY: 'SET_CURRENCY',
    SET_LOCRATE: 'SET_LOCRATE',
    SET_PREFER_CURRENCY: 'SET_PREFER_CURRENCY',
    SET_PREFER_LOCRATE: 'SET_PREFER_LOCRATE',
    UPDATE_LOC_AMOUNTS: 'UPDATE_LOC_AMOUNTS',
    REMOVE_LOC_AMOUNT: 'REMOVE_LOC_AMOUNT',
    CLEAR_LOC_AMOUNTS: 'CLEAR_LOC_AMOUNTS'
};

export const getCurrency = (currency, isRefresh = true, isPrefer = true) => {
    return dispatch => {
        if (isRefresh) {
            if (isPrefer) {
                dispatch(setCurrency({currency}));
            }
            else {
                dispatch(setPreferCurrency({currency}));
            }
        }
        requester.getCurrencyRates().then(res => {
            res.body.then(currencyExchangeRates => {
                //this.props.dispatch(setCurrencyExchangeRates(currencyExchangeRates));
                console.log("currencyExchangeRates", currencyExchangeRates);
            });
        });

        requester.getLocRateByCurrency(currency).then(res => {
            res.body.then(data => {
                console.log("action getCurrency data", data);
                let locPrice = 0;
                if (currency == 'EUR') {
                    locPrice = data[0].price_eur;
                }
                else if (currency == 'USD') {
                    locPrice = data[0].price_usd;
                }
                else if (currency == 'GBP') {
                    locPrice = data[0].price_gbp;
                }
                if (isPrefer) {
                    dispatch(setLocRate({locRate:locPrice}));
                }
                else {
                    dispatch(setPreferLocRate({locRate:locPrice}));
                }
            }).catch(err => {
                console.log("getCurrency error", err);
            });
        });
    }
};

export const setLocPriceWebsocketConnection = createAction(currencyInfo.SET_LOC_PRICE_WEBSOCKET_CONNECTION);
export const setCurrency = createAction(currencyInfo.SET_CURRENCY);
export const setLocRate = createAction(currencyInfo.SET_LOCRATE);
export const setPreferCurrency = createAction(currencyInfo.SET_PREFER_CURRENCY);
export const setPreferLocRate = createAction(currencyInfo.SET_PREFER_LOCRATE);
export const updateLocAmounts = createAction(currencyInfo.UPDATE_LOC_AMOUNTS);
export const removeLocAamount = createAction(currencyInfo.REMOVE_LOC_AMOUNT);
export const clearLocAmounts = createAction(currencyInfo.CLEAR_LOC_AMOUNTS);