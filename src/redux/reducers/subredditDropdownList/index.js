import { FETCH_SUBREDDITS_REQUEST, FETCH_SUBREDDITS_SUCCESS, FETCH_SUBREDDITS_FAILURE } from "../../actions/subredditDropdownList/index";

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function subredditListReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SUBREDDITS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_SUBREDDITS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };

        case FETCH_SUBREDDITS_FAILURE:
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