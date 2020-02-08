import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Auth from '../../service/auth-service';

export default ({ component: Component, customParams, ...rest }) => {
    return (
        <Route
            { ...rest }
            render={ (props) => {
                if (Auth.isAuthenticated()) {
                    return <Component { ...props } { ...customParams } />;
                }
                return (
                    <Redirect
                        to={ { pathname: '/login', state: { from: props.location } } }
                    />
                );
            } }
        />
    )
}