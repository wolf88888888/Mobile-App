import { combineReducers } from 'redux';
import { RootNavigator } from '../../routing';
import currency from './Currency'

function nav(state, action) {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    return nextState || state;
}

const appReducers = combineReducers({
    nav,
    currency
});

export default appReducers;
