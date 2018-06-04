import { combineReducers } from 'redux';
import { payment } from '../common/reducers';
import explore from '../../components/screens/Explore/reducer';

const rootReducer = combineReducers({
    paymentInfo: payment,
    explore
});

export default rootReducer;
