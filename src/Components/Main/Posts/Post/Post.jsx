import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    return (
        <div className={classes.Post}>
            <div>{props.text}</div>
            <div>{props.like}</div>    
        </div>
    )
};

export default Post;