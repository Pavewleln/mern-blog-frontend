import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsNew,
  fetchPostsPopular,
  fetchTags,
  getAllPosts,
} from "../redux/slices/post";
import { fetchCommentsNew, getAllComments } from "../redux/slices/comment";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const [typePosts, setTypePosts] = useState("new");
  const { items, status } = useSelector(getAllComments());
  const isLoadingComments = status === "loading";
  useEffect(() => {
    typePosts === "new"
      ? dispatch(fetchPostsNew())
      : dispatch(fetchPostsPopular());
    dispatch(fetchCommentsNew());
    dispatch(fetchTags());
  }, [typePosts, setTypePosts]);
  const { posts, tags } = useSelector(getAllPosts());
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const toggleTypePosts = () => {
    setTypePosts((prevState) => (prevState === "new" ? "popular" : "new"));
  };
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={typePosts === "new" ? 0 : 1}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" onClick={toggleTypePosts} />
        <Tab label="Популярные" onClick={toggleTypePosts} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                _id={post._id}
                title={post.title}
                imageUrl={
                  post.imageUrl ? `http://localhost:3000${post.imageUrl}` : ""
                }
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={3}
                tags={post.tags}
                isEditable={userData?._id === post.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={items.slice(-5)}
            isLoading={isLoadingComments}
          />
        </Grid>
      </Grid>
    </>
  );
};
