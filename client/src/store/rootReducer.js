import { combineReducers } from 'redux';
import userReducer from "./user/reducer"
import friendReducer from "./friend/reducer";


const rootReducer =  combineReducers({
    user: userReducer,
    friends: friendReducer
});

export default rootReducer