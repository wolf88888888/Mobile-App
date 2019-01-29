import { handleActions } from 'redux-actions';
import {
    setLocPriceWebsocketConnection
 } from '../../action/exchangerSocket';

const initialState  = {
    isLocPriceWebsocketConnected: false,
};
  
export default handleActions(
    {
        [setLocPriceWebsocketConnection]: (state, {payload}) => {
            return { ...state, isLocPriceWebsocketConnected: payload};
        }
    },
    initialState
);