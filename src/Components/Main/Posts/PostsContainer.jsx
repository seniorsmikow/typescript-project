import Posts from './Posts';
import {addPost} from '../../../Redux/Posts-reducer';
import {connect} from 'react-redux';

let mapStateToProps = (state) => {
    return {
        posts: state.postsPage.posts,
        newText: state.postsPage.inputText
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (postText) => {
            dispatch(addPost(postText));
        },
    };
};

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;