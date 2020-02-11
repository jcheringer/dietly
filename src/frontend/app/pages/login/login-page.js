import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthService from '../../service/auth-service';
import { commonLogin, googleLogin, register } from '../../store/actions/users-action'

import Style from './login-page.less';
import CS from '../../../style/common.less';

const loginPage = (props) => {
    const googleApi = window['gapi'];

    googleApi.load('auth2', () => {
        googleApi.auth2.init({
            client_id: config.CLIENT_ID
        }).then(() => {
            setGoogleReady(true);
        });
    });

    const history = useHistory();
    const [isGoogleReady, setGoogleReady] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };

    const commonLoginHandler = () => {
        props.commonLogin({ email, password }).then((response) => {
            AuthService.saveToken(response.data.token);
            history.push(`/`);
        });
    };

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

    const registerHandler = () => {
        props.register({ name, email, password }).then((response) => {
            AuthService.saveToken(response.data.token);
            history.push(`/`);
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
                { !showRegisterForm ? (

                    <div className={ Style.Content }>
                        <div className={ CS.FloatingLabelContainer }>
                            <input type="text" placeholder="E-mail" value={ email } onChange={ emailChangeHandler } />
                            <label>E-mail</label>
                        </div>
                        <div className={ [CS.FloatingLabelContainer, CS.Mb03].join(' ') }>
                            <input type="password" placeholder="Senha" value={ password } onChange={ passwordChangeHandler } />
                            <label>Senha</label>
                        </div>
                        <button
                            onClick={ commonLoginHandler }
                            className={ [CS.BtnPrimary, CS.BlockButton].join(' ') }
                        >
                            Entrar
                        </button>

                        <div className={ Style.ChangeFormTip }>
                            <span>Não possui cadastro?</span>
                            <a onClick={ () => setShowRegisterForm(true) }>Cadastre-se</a>
                        </div>

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
                ) : (
                    <div className={ Style.Content }>
                        <div className={ CS.FloatingLabelContainer }>
                            <input type="text" placeholder="Nome" value={ name } onChange={ nameChangeHandler } />
                            <label>Nome</label>
                        </div>
                        <div className={ CS.FloatingLabelContainer }>
                            <input type="text" placeholder="E-mail" value={ email } onChange={ emailChangeHandler } />
                            <label>E-mail</label>
                        </div>
                        <div className={ [CS.FloatingLabelContainer, CS.Mb03].join(' ') }>
                            <input type="password" placeholder="Senha" value={ password } onChange={ passwordChangeHandler } />
                            <label>Senha</label>
                        </div>
                        <button
                            onClick={ registerHandler }
                            className={ [CS.BtnPrimary, CS.BlockButton].join(' ') }
                        >
                            Cadastrar
                        </button>
                        <div className={ Style.ChangeFormTip }>
                            <span>Já possui cadastro?</span>
                            <a onClick={ () => setShowRegisterForm(false) }>Acesse</a>
                        </div>
                    </div>
                ) }
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    register: (data) => dispatch(register(data)),
    googleLogin: (data) => dispatch(googleLogin(data)),
    commonLogin: (data) => dispatch(commonLogin(data))
});

export default connect(null, mapDispatchToProps)(loginPage);