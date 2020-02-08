import React from 'react';
import { Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';

import MainPage from './pages/main/main-page';
import LoginPage from './pages/login/login-page';
import ProtectedRoute from './components/protected-route/protected-route';
import history from './utils/history';
import Store from './store';

const app = () => {
    return (
        <Provider store={ Store }>
            <Router history={ history }>
                <Switch>
                    <Route path="/login" component={ LoginPage } />
                    <ProtectedRoute path="/" component={ MainPage } />
                </Switch>
            </Router>
        </Provider>
    )
};

export default app;