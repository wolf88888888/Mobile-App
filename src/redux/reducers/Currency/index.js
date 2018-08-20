import { AsyncStorage } from 'react-native';
import { handleActions } from 'redux-actions';
import { setCurrency, setLocRate } from '../../action/Currency';

// function initialState(){
//     console.log("currency reduc init", global);
//     let currency = 'USD';
//     if (global.currency == undefined || global.currency == null) {
//         currency = global.currency;
//     }
//     let currencySign = getCurrencySign(currency);
//     let locRate = 0;
//     if (global.locRate == undefined || global.locRate == null) {
//         locRate = global.locRate;
//     }

//     return {currency, currencySign, locRate}
// }

const initialState = () => ({
    currency: 'EUR', 
    currencySign: '€', 
    locRate: 0.0
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
        }
    },
    initialState()
);