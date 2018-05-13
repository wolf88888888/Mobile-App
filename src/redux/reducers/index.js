import { combineReducers } from 'redux';
import { payment } from '../common/reducers';
import book from '../../components/screens/Explore/reducer';

const rootReducer = combineReducers({
    paymentInfo: payment,
    book
});

export default rootReducer;
