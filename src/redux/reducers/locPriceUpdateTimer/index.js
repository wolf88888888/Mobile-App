import { handleActions } from 'redux-actions';
import {
    setSeconds,
    reset
 } from '../../action/locPriceUpdateTimer';

const initialState  = {
    seconds: null
};
  
export default handleActions(
    {
        [setSeconds]: (state, {payload}) => {
            return {
                ...state,
                seconds: payload < 0 ? 0 : payload
            };
        },

        [reset]: (state) => {
            return {
                ...state,
                seconds: null
            };
        },
    },
    initialState
);