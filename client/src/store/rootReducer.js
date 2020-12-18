import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import friendReducer from "./friend/reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  friends: friendReducer,
});

export default persistReducer(persistConfig, rootReducer);
