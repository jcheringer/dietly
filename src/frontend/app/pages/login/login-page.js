import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthService from '../../service/auth-service';
import { googleLogin } from '../../store/actions/users-action'

import Style from './login-page.less';
import CS from '../../../style/common.less';

const loginPage = (props) => {
    const googleApi = window.gapi;

    googleApi.load('auth2', () => {
        googleApi.auth2.init({
            client_id: config.CLIENT_ID
        }).then(() => {
            setGoogleReady(true);
        });
    });

    const history = useHistory();
    const [isGoogleReady, setGoogleReady] = useState(false);

    const googleLoginHandler = () => {
        if (!isGoogleReady) {
            return;
        }

        const googleAuth = googleApi.auth2.getAuthInstance();

        googleAuth.signIn().then(googleUser => {
            const email = googleUser.getBasicProfile().getEmail();
            const idToken = googleUser.getAuthResponse().id_token;

            props.googleLogin({ email, idToken }).then((response) => {
                AuthService.saveToken(response.data.token);
                history.push(`/`);
            });
        });
    };

    useEffect(() => {
        if (AuthService.isAuthenticated()) {
            history.push(`/`);
        }
    }, []);

    return (
        <div className={ Style.LoginPage }>
            <h1>Dietly</h1>
            <div className={ Style.Container }>
                <div className={ Style.Content }>
                    <div className={ CS.FloatingLabelContainer }>
                        <input type="text" placeholder="E-mail" />
                        <label>E-mail</label>
                    </div>
                    <div className={ CS.FloatingLabelContainer }>
                        <input type="text" placeholder="Senha" />
                        <label>Senha</label>
                    </div>
                    <button className={ [CS.BtnPrimary, CS.BlockButton].join(' ') }>Login</button>
                    <div className={ Style.LabeledDiv }>
                        <hr />
                        <span>Ou</span>
                        <hr />
                    </div>
                    <button
                        onClick={ googleLoginHandler }
                        className={ [Style.GoogleButton, CS.BlockButton].join(' ') }
                    >
                        <span className={ Style.Icon } />
                        <span>Entre com o Google</span>
                    </button>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    googleLogin: (data) => dispatch(googleLogin(data))
});

export default connect(null, mapDispatchToProps)(loginPage);