import React, { Fragment } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import DiaryPage from '../diary/diary-page';
import MenuPage from '../menu/menu-page';
import DietsPage from '../diets/diets-page';
import DietEditPage from '../diet-edit/diet-edit-page';

import './main-page.less';

const isDietPage = (match, location) => {
    return location.pathname.match(/^\/diet/);
};

const mainPage = () => {
    return (
        <Fragment>
            <header>
                <div className="header-content">
                    <div className="logo">Dietly</div>
                    <ul>
                        <li>
                            <NavLink to="/" activeClassName="active" exact>Diário</NavLink>
                        </li>
                        <li>
                            <NavLink to="/diets" activeClassName="active" isActive={ isDietPage }>Dietas</NavLink>
                        </li>
                        <li>
                            <NavLink to="/menu" activeClassName="active">Cardápio</NavLink>
                        </li>
                    </ul>
                </div>
            </header>
            <main>
                <Switch>
                    <Route path="/" component={ DiaryPage } exact />
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