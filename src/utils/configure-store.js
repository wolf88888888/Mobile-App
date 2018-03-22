import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import rootReducer from "../reducers/index";

const logger = createLogger();

export default function configureStore(initialState) {
  const createStoreWithMiddleware = applyMiddleware(logger)(createStore)(rootReducer);
  return createStoreWithMiddleware;
}
