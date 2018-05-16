import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const middlewares = [
    thunk
];

const enchancer = composeWithDevTools({
    serialize: true,
    actionSanitizer: (action) => {
        if (typeof action.type === 'symbol') {
            const actionCopy = { ...action }; // Don't change the original action
            actionCopy.type = action.type.toString(); // DevTools doesn't work with Symbols
            return actionCopy;
        }
        return action;
    }
})(applyMiddleware(...middlewares));

let store = createStore(rootReducer, enchancer); // eslint-disable-line

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    const acceptCallback = () => {
        const nextRootReducer = require('../reducers').default;
        store.replaceReducer(nextRootReducer);
    };
    module.hot.accept('../reducers', acceptCallback);
    module.hot.acceptCallback = acceptCallback;
}

export default store;
