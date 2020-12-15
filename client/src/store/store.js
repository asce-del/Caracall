import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger"
import rootReducer from "./rootReducer";
import {persistStore} from "redux-persist"
import thunk from "redux-thunk";

import { composeWithDevTools } from 'redux-devtools-extension'

const middlewares = [logger, thunk]

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

export const persistor = persistStore(store)
