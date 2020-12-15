const ADD_POST = 'posts/ADD_POST';
const DELETE_POST = 'posts/DELETE_POST';

let initialState = {
        posts: [
            {id: 1, text: "one", like: "23" },
            {id: 2, text: "two", like: "24" },
            {id: 3, text: "three", like: "67" },
            {id: 4, text: "four", like: "89" },
            {id: 5, text: "five", like: "34"}
        ],
};

const postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
        {
            return {
                ...state,
                posts: [...state.posts, {text: action.postText, like: "15"}]
            };
        }
        case DELETE_POST:
        {
            return {
                ...state,
                posts: state.posts.filter(item => item.id !== action.id)
            };
        }
        default:
            return state;
    }
        
};

export const addPost = (postText) => {
    return {
        type: ADD_POST,
        postText
    };
};

export const deletePost = (id) => {
    return {
        type: DELETE_POST,
        id
    };
};

export default postsReducer;