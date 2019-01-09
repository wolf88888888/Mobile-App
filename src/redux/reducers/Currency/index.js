import { AsyncStorage } from 'react-native';
import { handleActions } from 'redux-actions';
import { 
    setCurrency, 
    setLocRate, 
 } from '../../action/Currency';

const initialState = () => {
    
    return ({
        currency: 'EUR', 
        currencySign: '€', 
        // locRate: 0.0,
    })
}

function getCurrencySign(currency) {
    let currencySign = '$';
    if (currency === 'GBP') currencySign = '£';
    if (currency === 'EUR') currencySign = '€';
    return currencySign;
}

export default handleActions(
    {
        [setCurrency]: (state, {payload}) => {
            let currency = payload.currency;
            let currencySign = getCurrencySign(currency);
            AsyncStorage.setItem('currency', currency);
            // AsyncStorage.setItem('locRate', JSON.stringify(0.0));

            return { ...state, currency: currency,  currencySign: currencySign, locRate: 0.0};
        },

        // [setLocRate]: (state, {payload}) => {
        //     AsyncStorage.setItem('locRate', JSON.stringify(payload.locRate));

        //     return { ...state, locRate: payload.locRate};
        // },
    },
    initialState()
);