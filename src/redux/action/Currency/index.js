import { createAction } from 'redux-actions';
import requester from '../../../initDependencies';

const currencyInfo = {
    SET_CURRENCY: 'SET_CURRENCY',
    SET_LOC_RATE: 'SET_LOC_RATE'
};

export const getCurrency = (currency) => {
    return dispatch => {
        dispatch(setCurrency({currency}));
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
                dispatch(setLocRate({locRate:locPrice}));
            }).catch(err => {
                console.log(err);
            });
        });
    }
};

export const setCurrency = createAction(currencyInfo.SET_CURRENCY);
export const setLocRate = createAction(currencyInfo.SET_LOC_RATE);