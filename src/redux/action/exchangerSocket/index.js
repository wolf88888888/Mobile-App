import { createAction } from 'redux-actions';

const exchangerSocketInfoType = {
    SET_LOC_PRICE_WEBSOCKET_CONNECTION: 'SET_LOC_PRICE_WEBSOCKET_CONNECTION',
};

export const setLocPriceWebsocketConnection = createAction(exchangerSocketInfoType.SET_LOC_PRICE_WEBSOCKET_CONNECTION);