import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';

import MainPage from './pages/main/main-page';
import LoginPage from './pages/login/login-page';
import Store from './store';

export default function () {
    return (
        <Provider store={ Store }>
            <Router>
                <Switch>
                    <Route path="/login" component={ LoginPage } />
                    <Route path="/" component={ MainPage } />
                </Switch>
            </Router>
        </Provider>
    )
}