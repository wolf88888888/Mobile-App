import { createAction } from 'redux-actions';

const locAmountsInfoType = {
    UPDATE_LOC_AMOUNTS: 'UPDATE_LOC_AMOUNTS',
    REMOVE_LOC_AMOUNT: 'REMOVE_LOC_AMOUNT',
    CLEAR_LOC_AMOUNTS: 'CLEAR_LOC_AMOUNTS',
};

export const updateLocAmounts = createAction(locAmountsInfoType.UPDATE_LOC_AMOUNTS);
export const removeLocAmount = createAction(locAmountsInfoType.REMOVE_LOC_AMOUNT);
export const clearLocAmounts = createAction(locAmountsInfoType.CLEAR_LOC_AMOUNTS);