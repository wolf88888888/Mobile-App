import { combineReducers } from 'redux';
import { RootNavigator } from '../../routing';

function nav(state, action) {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    return nextState || state;
}

const appReducers = combineReducers({
    nav,
});

export default appReducers;
