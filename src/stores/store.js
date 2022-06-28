import { configureStore } from "@reduxjs/toolkit";
import authReducer from "src/stores/authSlice";
import userReducer from "src/stores/userSlice";
import postReducer from "src/stores/postSlice";
import categoryReducer from "src/stores/categorySlice";

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  category: categoryReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
