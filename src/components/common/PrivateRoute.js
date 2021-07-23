import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ component: Component }) => {
    const { isAuthenticated, isLoading } = useSelector(state => state.authReducer);

    const privateTest = () => {
        if (isLoading) {
            return <h2>Loading...</h2>;
        }
        else if (!isAuthenticated) {
            return <Redirect to="/login" />;
        }
        else {
            return <Component />
        }
    };

    return (
        privateTest()
    );
};
