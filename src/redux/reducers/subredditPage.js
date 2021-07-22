const subredditPageReducer = (state = { fetchedData: null, isLoading: true }, action) => {
    switch (action.type) {
        case "FETCH_A_SUBREDDIT":
            try {
                fetch(`http://127.0.0.1:8000/redditclone/r/${action.payload}/`)
                    .then(response => response.json())
                    .then(data => {
                        state.fetchedData = data;
                        state.isLoading = false;
                    });
            } catch (error) {
                console.error(error);
                return;
            }
            return state;
        default:
            return state;
    };
};

export default subredditPageReducer;