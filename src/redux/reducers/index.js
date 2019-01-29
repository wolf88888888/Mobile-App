import { combineReducers } from 'redux';
import { RootNavigator } from '../../routing';
import currency from './Currency'
import country from './Country'
import exchangerSocket from './exchangerSocket'
import locAmounts from './locAmounts'
import exchangeRates from './exchangeRates';
import locPriceUpdateTimer from './locPriceUpdateTimer'

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
    exchangeRates,
    locPriceUpdateTimer
});

export default appReducers;
