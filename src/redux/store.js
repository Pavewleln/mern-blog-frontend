import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { postReducer } from "./slices/post";
import { commentReducer } from "./slices/comment";

const store = configureStore({
  reducer: { posts: postReducer, auth: authReducer, comments: commentReducer },
});

export default store;
