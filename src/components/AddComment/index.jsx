import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAuthInfo, selectIsAuth } from "../../redux/slices/auth";
import { fetchCreateNewComment } from "../../redux/slices/comment";

export const Index = ({ postId }) => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const auth = useSelector(getAuthInfo);
  const [text, setText] = React.useState("");
  const onSubmit = async () => {
    if (!isAuth) {
      return alert("Сначала авторизуйтесь");
    }
    try {
      const fields = {
        imageUrl: auth.imageUrl ? auth.imageUrl : "",
        fullname: auth.fullname,
        text,
        postId: postId,
      };
      dispatch(fetchCreateNewComment({ fields })).then(() => {
        setText("");
      });
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создания комментария");
    }
  };
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={onSubmit} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
