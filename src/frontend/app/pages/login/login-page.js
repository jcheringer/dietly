import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';


import AuthService from '../../service/auth-service';
import { googleLogin } from '../../store/actions/users-action'

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
        <div>
            <h1>Login Page</h1>
            { isGoogleReady && (
                <button onClick={ googleLoginHandler }>Google Login</button>
            ) }
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    googleLogin: (data) => dispatch(googleLogin(data))
});

export default connect(null, mapDispatchToProps)(loginPage);