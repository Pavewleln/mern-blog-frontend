import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCommentsNew = createAsyncThunk(
  "posts/fetchCommentsNew",
  async () => {
    const { data } = await axios.get("/comments");
    return data;
  }
);
export const fetchCreateNewComment = createAsyncThunk(
  "posts/fetchCreateNewComment",
  async ({ fields }) => {
    const { data } = await axios.post("/comments", fields);
    return data;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: {
      items: [],
      status: "loading",
    },
  },
  reducers: {},
  extraReducers: {
    [fetchCommentsNew.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },
    [fetchCommentsNew.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchCommentsNew.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
    [fetchCreateNewComment.pending]: (state) => {
      state.comments.status = "loading";
    },
    [fetchCreateNewComment.fulfilled]: (state, action) => {
      state.comments.items.push(action.payload);
      state.comments.status = "loaded";
    },
    [fetchCreateNewComment.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
  },
});

export const getAllComments = () => (state) => state.comments.comments;
export const commentReducer = commentSlice.reducer;
