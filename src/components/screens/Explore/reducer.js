import immutable from 'immutable';
import { SEARCH_VALUE, SELECT_CHECK_IN_CHECK_OUT } from './actionTypes';


export default function book(state = immutable.fromJS({}), action) {
    switch (action.type) {
    case SEARCH_VALUE:
        return state.set('search', action.params.value);

    case SELECT_CHECK_IN_CHECK_OUT:
        return state
            .set('checkInDate', action.params.startDate.toString())
            .set('checkOutDate', action.params.endDate.toString());
    default:
        return state;
    }
}
