import { FETCH_SUBREDDITPOSTS_REQUEST, FETCH_SUBREDDITPOSTS_SUCCESS, FETCH_SUBREDDITPOSTS_FAILURE } from "../../actions/allSubredditPosts/index";

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function allSubredditPostsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SUBREDDITPOSTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_SUBREDDITPOSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };

        case FETCH_SUBREDDITPOSTS_FAILURE:
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