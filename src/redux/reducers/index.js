import { combineReducers } from 'redux';
import { RootNavigator } from '../../routing';

function nav(state, action) {
    const newState = RootNavigator.router.getStateForAction(action, state);
    return newState || state;
}
const rootReducer = combineReducers({
    nav,
});

export default rootReducer;
