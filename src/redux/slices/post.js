import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPostsNew = createAsyncThunk(
  "posts/fetchPostsNew",
  async () => {
    const { data } = await axios.get("/posts/new");
    return data;
  }
);
export const fetchPostsPopular = createAsyncThunk(
  "posts/fetchPostsPopular",
  async () => {
    const { data } = await axios.get("/posts/popular");
    return data;
  }
);
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});
export const fetchPostsByTag = createAsyncThunk(
  "posts/fetchPostsByTag",
  async (tag) => {
    const { data } = await axios.get(`/tags/${tag}`);
    return data;
  }
);
export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: {
      items: [],
      status: "loading",
    },
    tags: {
      items: [],
      status: "loading",
    },
  },
  reducers: {},
  extraReducers: {
    [fetchPostsNew.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPostsNew.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsNew.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [fetchPostsByTag.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsByTag.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [fetchPostsPopular.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPostsPopular.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsPopular.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
    [fetchRemovePost.rejected]: (state) => {
      state.posts.status = "error";
    },
  },
});

export const getAllPosts = () => (state) => state.posts;

export const postReducer = postSlice.reducer;
