import React, { Fragment, useEffect } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import DashboardPage from '../dashboard/dashboard-page';
import MenuPage from '../menu/menu-page';
import DietsPage from '../diets/diets-page';
import DietEditPage from '../diet-edit/diet-edit-page';

import './main-page.less';

const mainPage = () => {
    return (
        <Fragment>
            <header>
                <div className="header-content">
                    <div className="logo">Dietly</div>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/diets">Dietas</Link></li>
                        <li><Link to="/menu">Cardápio</Link></li>
                    </ul>
                </div>
            </header>
            <main>
                <Switch>
                    <Route path="/" component={ DashboardPage } exact />
                    <Route path="/diets" component={ DietsPage } />
                    <Route path="/diet/:dietId" component={ DietEditPage } />
                    <Route path="/menu" component={ MenuPage } />
                </Switch>
            </main>
        </Fragment>
    )
};

const mapStateToProps = (state) => ({
    userData: state.userState.user
});

export default connect(mapStateToProps)(mainPage);