const subredditListReducer = (state = { fetchedData: null }, action) => {
    switch (action.type) {
        case "FETCH_SUBREDDITS":
            fetch("http://127.0.0.1:8000/redditclone/subreddits/")
                .then(response => response.json())
                .then(data => state.fetchedData = data);
            return state;
        default:
            return state;
    };
};

export default subredditListReducer;