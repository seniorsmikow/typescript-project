const ADD_POST = 'posts/ADD_POST'
const DELETE_POST = 'posts/DELETE_POST'

type PostDataType = {
    id: number
    text: string
    like: number
}

type InitialStateType = {
    posts: Array<PostDataType>
}

let initialState: InitialStateType = {
        posts:  [
            {id: 1, text: "one", like: 23 },
            {id: 2, text: "two", like: 24 },
            {id: 3, text: "three", like: 67 },
            {id: 4, text: "four", like: 89 },
            {id: 5, text: "five", like: 34}
        ],
}

const postsReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch(action.type) {
        case ADD_POST:
        {
            return {
                ...state,
                posts: [...state.posts, {id: 6, text: action.postText, like: 15}]
            }
        }
        case DELETE_POST:
        {
            return {
                ...state,
                posts: state.posts.filter(item => item.id !== action.id)
            }
        }
        default:
            return state
    }
        
}

type AddPostType = {
    type: typeof ADD_POST
    postText: string
}

type DeletePost = {
    type: typeof DELETE_POST
    id: number 
}

export const addPost = (postText: string): AddPostType => {
    return {
        type: ADD_POST,
        postText
    };
};

export const deletePost = (id: number): DeletePost => {
    return {
        type: DELETE_POST,
        id
    }
}

export default postsReducer