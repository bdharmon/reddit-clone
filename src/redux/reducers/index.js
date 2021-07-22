import { combineReducers } from "redux";
import subredditListReducer from "./subredditList";
import subredditPageReducer from "./subredditPage";
import commentReducer from "./comment";

const allReducers = combineReducers({
    subredditListReducer,
    subredditPageReducer,
    commentReducer
});

export default allReducers;