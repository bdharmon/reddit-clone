const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
};

export default authReducer;