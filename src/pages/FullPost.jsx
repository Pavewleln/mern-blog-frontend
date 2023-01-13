import React, { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios.js";
import ReactMarkdown from "react-markdown";
import { fetchCommentsNew, getAllComments } from "../redux/slices/comment";
import { useDispatch, useSelector } from "react-redux";

export const FullPost = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const { items, status } = useSelector(getAllComments());
  const isLoadingComments = status === "loading";
  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
  }, []);
  useEffect(() => {
    dispatch(fetchCommentsNew());
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  const commentsByPostId = items.filter((i) => i.post == id);
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:3000${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={commentsByPostId} isLoading={isLoadingComments}>
        <Index postId={id} />
      </CommentsBlock>
    </>
  );
};
