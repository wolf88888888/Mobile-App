import { combineReducers } from 'redux';
import { paymentInfo } from '../common/actionTypes';

const rootInitialState = {
    currency: 0,
    locRate: 0,
};

const rooter = (state = rootInitialState, action) => {
    switch (action) {
      case paymentInfo.SET_CURRENCY:
          return Object.assign({}, state, {
                      currency: action.currency
                  });
      case paymentInfo.SET_LOC_RATE:
          return Object.assign({}, state, {
                      locRate: action.locRate
                  });
      default:
          return state
    }
};

const rootReducer = combineReducers({
    rooter
});

export default rootReducer;
