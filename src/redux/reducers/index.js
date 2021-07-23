import { combineReducers } from "redux";
import subredditListReducer from "./subredditDropdownList";
import allPostsReducer from "./allPosts";
import allSubredditPostsReducer from "./allSubredditPosts";
import allCommentsReducer from "./postComments";
import authReducer from "./auth";

const allReducers = combineReducers({
    subredditListReducer,
    allPostsReducer,
    allSubredditPostsReducer,
    allCommentsReducer,
    authReducer
});

export default allReducers;