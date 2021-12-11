import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";

import { CircularProgress, Grid, Typography } from "@material-ui/core";

const Posts = ({currentId, setCurrentId}) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts)
    return <CircularProgress />
  else if (posts.length === 0)
    return (
      <Typography variant="h6" align="center">Add your first Memory, we are waiting!</Typography>
    );
  else {
    return (
      <Grid className={classes.container} container alignItems="stretch" spacing={3} >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post  post={post} currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default Posts;