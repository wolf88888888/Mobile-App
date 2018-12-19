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