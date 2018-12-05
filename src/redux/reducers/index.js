import { combineReducers } from 'redux';
import { RootNavigator } from '../../routing';
import currency from './Currency'
import country from './Country'
import exchangerSocket from './exchangerSocket'
import locAmounts from './locAmounts'
import exchangeRates from './exchangeRates';

function nav(state, action) {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    return nextState || state;
}

const appReducers = combineReducers({
    nav,
    currency,
    country,
    exchangerSocket,
    locAmounts,
    exchangeRates
});

export default appReducers;
