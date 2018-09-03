import { combineReducers } from 'redux';
import { RootNavigator } from '../../routing';
import currency from './Currency'
import country from './Country'

function nav(state, action) {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    return nextState || state;
}

const appReducers = combineReducers({
    nav,
    currency,
    country
});

export default appReducers;
