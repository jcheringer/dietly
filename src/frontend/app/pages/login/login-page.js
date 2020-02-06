import React, { useState } from 'react';
import axios from 'axios';

export default function () {
    const googleApi = window.gapi;
    const [isGoogleReady, setGoogleReady] = useState(false);

    googleApi.load('auth2', function () {
        googleApi.auth2.init({
            client_id: '279371363425-3m2eqdvvooifsn6reb8o7ura7hrqelvi.apps.googleusercontent.com'
        }).then(() => {
            setGoogleReady(true);
        });
    });

    const googleLoginHandler = () => {
        const googleAuth = googleApi.auth2.getAuthInstance();

        googleAuth.signIn().then(googleUser => {
            const email = googleUser.getBasicProfile().getEmail();
            const idToken = googleUser.getAuthResponse().id_token;

            axios.post('/api/login', { email, idToken }).then(() => {

            });
        });
    };

    return (
        <div>
            <h1>Login Page</h1>
            { isGoogleReady && (
                <button onClick={ googleLoginHandler }>Google Login</button>
            ) }
        </div>
    )
}