import postsReducer from '../Redux/Posts-reducer';
import React from 'react';
import ReactDOM from 'react-dom';
import { addPost, deletePost } from '../Redux/Posts-reducer';

let state = {
    posts: [
        {id: 1, text: "one", like: "23" },
        {id: 2, text: "two", like: "24" },
        {id: 3, text: "three", like: "67" },
        {id: 4, text: "four", like: "89" },
        {id: 5, text: "five", like: "34"}
    ],
};

it('new post incremented', () => {

    let action = addPost('ddfff');

    let newState = postsReducer(state, action);

    expect(newState.posts.length).toBe(6);
});

it('new post text changed', () => {

    let action = addPost('new post');

    let newState = postsReducer(state, action);

    expect(newState.posts[5].text).toBe("new post");
});

it('delete post', () => {

    let action = deletePost(1);

    let newState = postsReducer(state, action);

    expect(newState.posts.length).toBe(4);
});