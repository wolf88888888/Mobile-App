import { AsyncStorage } from 'react-native';
import { handleActions } from 'redux-actions';
import { setCurrency, setLocRate, setPreferCurrency, setPreferLocRate } from '../../action/Currency';

const initialState = () => ({
    currency: 'EUR', 
    currencySign: '€', 
    locRate: 0.0,
    preferCurrency: 'EUR',
    preferCurrencySign: '€', 
    preferLocRate: 0.0,
});

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
            AsyncStorage.setItem('locRate', JSON.stringify(0.0));
            console.log ("handleActions - setCurrency ------------------", currency, currencySign);

            return { ...state, currency: currency,  currencySign: currencySign, locRate: 0.0};
        },

        [setLocRate]: (state, {payload}) => {
            AsyncStorage.setItem('locRate', JSON.stringify(payload.locRate));
            console.log ("handleActions - setLocRate ------------------", payload.locRate);

            return { ...state, locRate: payload.locRate};
        },

        [setPreferCurrency]: (state, {payload}) => {
            let currency = payload.currency;
            let currencySign = getCurrencySign(currency);
            AsyncStorage.setItem('preferCurrency', currency);
            AsyncStorage.setItem('preferLocRate', JSON.stringify(0.0));
            console.log ("handleActions - setPreferCurrency ------------------", currency, currencySign);

            return { ...state, preferCurrency: currency, preferCurrencySign: currencySign, preferLocRate: 0.0};
        },
        
        [setPreferLocRate]: (state, {payload}) => {
            AsyncStorage.setItem('preferLocRate', JSON.stringify(payload.locRate));
            console.log ("handleActions - setPreferLocRate ------------------", payload.locRate);

            return { ...state, preferLocRate: payload.locRate};
        },
    },
    initialState()
);