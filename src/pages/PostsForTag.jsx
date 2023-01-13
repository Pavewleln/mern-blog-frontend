import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchPostsByTag, fetchTags, getAllPosts } from "../redux/slices/post";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { CommentsBlock, Post, TagsBlock } from "../components";
import { useParams } from "react-router-dom";

export const PostsForTag = () => {
  const { tag } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  useEffect(() => {
    dispatch(fetchPostsByTag(tag));
    dispatch(fetchTags());
  }, []);
  const { posts, tags } = useSelector(getAllPosts());
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label={tag} />
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
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
