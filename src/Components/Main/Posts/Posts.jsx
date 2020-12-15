import React, { createRef } from 'react';
import classes from './Posts.module.css';
import Post from './Post/Post';
import PostForm from '../../Forms/PostForm/PostForm';
import { reduxForm } from 'redux-form';


const Posts = (props) => {
    
    let posts = props.posts.map( (el, index) => <Post key={index} text={el.text} like={el.like}/> );

    const onSubmit = (value) => {
        props.addPost(value.postText);
    };

    const PostReduxForm = reduxForm({form: 'postsForm'})(PostForm);

    return (
        <div className={classes.Posts}>
            { posts }
            <PostReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

export default Posts;