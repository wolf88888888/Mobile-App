import { combineReducers } from 'redux';
import { payment } from '../common/reducers';

const rootReducer = combineReducers({
    paymentInfo: payment
});

export default rootReducer;
