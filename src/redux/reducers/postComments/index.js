import { FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE } from "../../actions/postComments/index";

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function allCommentsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };

        case FETCH_COMMENTS_FAILURE:
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