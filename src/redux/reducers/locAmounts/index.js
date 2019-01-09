import { handleActions } from 'redux-actions';
import {
    updateLocAmounts,
    removeLocAamount,
    clearLocAmounts,
 } from '../../action/locAmounts';

const initialState  = {
    locAmounts: {}
};
  
export default handleActions(
    {
        [updateLocAmounts]: (state, {payload}) => {
            if (payload.params && payload.params.quotedLoc) {
                return {
                    ...state,
                    locAmounts: {
                        ...state.locAmounts,
                        [payload.fiatAmount]: { //fiatAmount
                            locAmount: payload.params.locAmount,
                            quotedLoc: payload.params.quotedLoc,
                            quotedPair: payload.params.quotedPair,
                            roundedLocInEur: payload.params.roundedLocInEur,
                            fundsSufficient: payload.params.fundsSufficient,
                            fiatAmount: payload.params.fiatAmount
                        }
                    }
                };
            } 
            else if (payload.error) {
                return {
                    ...state,
                    locAmounts: {
                        ...state.locAmounts,
                        [payload.fiatAmount]: {
                            locAmount: null,
                            error: payload.error
                        }
                    }
                };
            }
            else if (Array.isArray(payload)) {
                let locAmounts = {};
                for (let i = 0; i < payload.length; i ++) {
                    const locInfo = payload[i];
                    if (locInfo.params && locInfo.params.quotedLoc){
                        locAmounts = {
                            ...locAmounts, 
                            [locInfo.fiatAmount]: { //fiatAmount
                                locAmount: locInfo.params.locAmount,
                                quotedLoc: locInfo.params.quotedLoc,
                                quotedPair: locInfo.params.quotedPair,
                                roundedLocInEur: locInfo.params.roundedLocInEur,
                                fundsSufficient: locInfo.params.fundsSufficient,
                                fiatAmount: locInfo.params.fiatAmount
                            }
                        }
                    }
                    else if (locInfo.error){
                        locAmounts = {
                            ...locAmounts, 
                            [locInfo.fiatAmount]: { //fiatAmount
                                locAmount: null,
                                error: locInfo.error
                            }
                        }
                    }
                    else {
                        locAmounts = {
                            ...locAmounts, 
                            [locInfo.fiatAmount]: { //fiatAmount
                                locAmount: locInfo.params.locAmount
                            }
                        }
                    }
                }
                console.log("update locamounts array", locAmounts);
                return {
                    ...state, 
                    locAmounts
                };
            }
            return {
                ...state,
                locAmounts: {
                    ...state.locAmounts,
                    [payload.fiatAmount]: {
                        locAmount: payload.params.locAmount
                    }
                }
            };
        },

        [removeLocAamount]: (state) => {
            delete state.locAmounts[action.fiatAmount];
            return {
              ...state,
              locAmounts: state.locAmounts
            };
        },

        [clearLocAmounts]: (state) => {
            return { ...state, locAmounts: {}};
        },
    },
    initialState
);