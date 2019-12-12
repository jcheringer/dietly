import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import DashboardPage from '../dashboard/dashboard-page';
import ReceiptsPage from '../receipts/receipts-page';
import DietsPage from '../diets/diets-page';
import DietEditPage from '../diet-edit/diet-edit-page';

import './main-page.less';

export default function () {
    return (
        <Fragment>
            <header>
                <div className="header-content">
                    <div className="logo">Dietly</div>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/diets">Dietas</Link></li>
                        <li><Link to="/receipts">Receitas</Link></li>
                    </ul>
                </div>
            </header>
            <main>
                <Switch>
                    <Route path="/" component={ DashboardPage } exact />
                    <Route path="/diets" component={ DietsPage } />
                    <Route path="/diet/:dietId" component={ DietEditPage } />
                    <Route path="/receipts" component={ ReceiptsPage } />
                </Switch>
            </main>
        </Fragment>
    )
}