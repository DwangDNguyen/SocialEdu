import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index.js";
// import userReducer from "./reducers/userSlice.js";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import localforage from "localforage";

const persistConfig = {
    key: "root-graduate-project",
    version: 1,
    storage: localforage,
};

// const rootReducer = combineReducers({ user: userReducer, eventReducer });
// const rootReducer = combineReducers(eventReducer);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

let persistor = persistStore(store);

export default store;
export { persistor };
