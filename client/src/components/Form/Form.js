import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });

  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const classes = useStyles();
  const dispatch = useDispatch();

  const clear = () => {
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });

    setCurrentId(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (postData.tags && typeof postData.tags === 'string') {
      postData.tags = postData.tags.replace(/ /g,'').split(',');
    }
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    }
    else {
      dispatch(createPost(postData));
    }
    clear();
  };

  return (
    <Paper>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId?'Updating':'Creating'} a Memory</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator: e.target.value})} ></TextField>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} ></TextField>
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} ></TextField>
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value})} ></TextField>
        <Typography variant="caption">Add comma(,) to seperate tags</Typography>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
          >
          </FileBase>
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>{currentId?'Update':'Add New'} Memory</Button>
        <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Cancel</Button>
      </form>
    </Paper>
  );
}

export default Form;