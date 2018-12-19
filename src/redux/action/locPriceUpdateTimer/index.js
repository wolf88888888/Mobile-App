import { createAction } from 'redux-actions';

const locPriceUpdateTimerInfoType = {
    SET_SECONDS: 'SET_SECONDS',
    RESET: 'RESET',
};

export const setSeconds = createAction(locPriceUpdateTimerInfoType.SET_SECONDS);
export const reset = createAction(locPriceUpdateTimerInfoType.RESET);