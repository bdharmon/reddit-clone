import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from "../../actions/allPosts/index";

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function allPostsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };

        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                items: []
            };

        default:
            return state;
    };
};