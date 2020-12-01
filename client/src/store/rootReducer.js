import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import userReducer from "./user/reducer"
import friendReducer from "./friend/reducer";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user', 'friends']
}

const rootReducer =  combineReducers({
    user: userReducer,
    friends: friendReducer
});

export default persistReducer(persistConfig,rootReducer)