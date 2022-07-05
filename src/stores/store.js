import { configureStore } from "@reduxjs/toolkit";
import authReducer from "src/stores/authSlice";
import userReducer from "src/stores/userSlice";
import postReducer from "src/stores/postSlice";
import categoryReducer from "src/stores/categorySlice";
import drawerReducer from "src/stores/drawerSlice";

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  category: categoryReducer,
  drawer: drawerReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
