import { combineReducers } from "redux";
import subredditListReducer from "./subredditDropdownList";
import allPostsReducer from "./allPosts";
import allSubredditPostsReducer from "./allSubredditPosts";
import allCommentsReducer from "./postComments";

const allReducers = combineReducers({
    subredditListReducer,
    allPostsReducer,
    allSubredditPostsReducer,
    allCommentsReducer
});

export default allReducers;