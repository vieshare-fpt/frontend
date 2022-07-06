import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "src/stores/authSlice";
import userReducer from "src/stores/userSlice";
import postReducer from "src/stores/postSlice";
import categoryReducer from "src/stores/categorySlice";
import drawerReducer from "src/stores/drawerSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//save into local storage
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persistedReducer,
    post: postReducer,
    category: categoryReducer,
    drawer: drawerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export default store;
