import React, { Fragment, useEffect } from 'react';
import { Switch, Route, NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser } from '../../store/actions/users-action';
import withConfirmation from '../../hocs/with-confirmation';
import Auth from '../../service/auth-service';

import DiaryPage from '../diary/diary-page';
import MenuPage from '../menu/menu-page';
import DietsPage from '../diets/diets-page';
import DietEditPage from '../diet-edit/diet-edit-page';

import ProfileImage from '../../components/profile-image/profile-image';

import './main-page.less';
import CS from '../../../style/common.less';

const isDietPage = (match, location) => {
    return location.pathname.match(/^\/diet/);
};

const mainPage = (props) => {
    const history = useHistory();

    const logoutHandler = () => {
        props.showConfirmation({
            body: 'Tem certeza que deseja sair?',
            confirmClickHandler: (setVisible) => {
                Auth.removeToken();
                history.push('/login');
                setVisible(false)
            }
        });
    };

    useEffect(() => {
        const userData = Auth.getUserData();
        props.getUser(userData.id);
    }, []);

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
                        <li className={ CS.Ml02 }><ProfileImage onClick={ logoutHandler } /></li>
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

const mapDispatchToProps = (dispatch) => ({
    getUser: (userId) => dispatch(getUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withConfirmation(mainPage));