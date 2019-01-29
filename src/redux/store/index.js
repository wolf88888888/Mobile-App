import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import appReducers from '../reducers';
import { middleware } from '../../routing'
import { logger } from 'redux-logger'

const middlewares = [thunk, middleware, logger];

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

let store = createStore(appReducers, enchancer); // eslint-disable-line
  
// if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     const acceptCallback = () => {
//         const nextRootReducer = require('../reducers').default;
//         store.replaceReducer(nextRootReducer);
//     };
//     module.hot.accept('../reducers', acceptCallback);
//     module.hot.acceptCallback = acceptCallback;
// }

export default store;
