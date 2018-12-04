import { AsyncStorage } from 'react-native';
import { handleActions } from 'redux-actions';
import { setLocPriceWebsocketConnection, setCurrency, setLocRate, setPreferCurrency, setPreferLocRate } from '../../action/Currency';

const initialState = () => ({
    isLocPriceWebsocketConnected: false,
    currency: 'EUR', 
    currencySign: '€', 
    locRate: 0.0,
    preferCurrency: 'EUR',
    preferCurrencySign: '€', 
    preferLocRate: 0.0,
    locAmounts: {}
});

function getCurrencySign(currency) {
    let currencySign = '$';
    if (currency === 'GBP') currencySign = '£';
    if (currency === 'EUR') currencySign = '€';
    return currencySign;
}

export default handleActions(
    {
        [setLocPriceWebsocketConnection]: (state, {payload}) => {
            return { ...state, isLocPriceWebsocketConnected: payload.isLocPriceWebsocketConnected};
        },

        // [updateLocAmounts]: (state, {payload}) => {
        //     return { ...state,  
        //         locAmounts: {
        //             ...state.locAmounts,
        //             [action.fiatAmount]: {
        //                 locAmount: payload.locAmount,
        //                 quotedLoc: payload.quotedLoc,
        //                 quotedPair: payload.quotedPair,
        //                 roundedLocInEur: payload.roundedLocInEur,
        //                 fundsSufficient: payload.fundsSufficient,
        //                 fiatAmount: payload.fiatAmount
        //             }
        //       }};
        // },

        [setCurrency]: (state, {payload}) => {
            let currency = payload.currency;
            let currencySign = getCurrencySign(currency);
            AsyncStorage.setItem('currency', currency);
            AsyncStorage.setItem('locRate', JSON.stringify(0.0));
            console.log ("handleActions -setCurrency ------------------", currency, currencySign);

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