import { paymentInfo } from './actionTypes';

export function setCurrency(value) {
    return {
        type: paymentInfo.SET_CURRENCY,
        currency: value
    };
}

export function setLocRate(value) {
    return {
        type: paymentInfo.SET_LOC_RATE,
        locRate: value
    };
}
