import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthorizationContextProvider} from "./Context/authorization_context";
import {Provider} from "react-redux";
import store from "./store/index";
import authentication from 'react-azure-b2c';
authentication.initialize({
    tenant: 'rcaazdemo.onmicrosoft.com',
    signInPolicy: 'B2C_1_BLoggerSignin',
    clientId: '9375dba2-4e5f-4377-863e-b231c608eada',
    cacheLocation: 'sessionStorage',
    scopes: ['9375dba2-4e5f-4377-863e-b231c608eada openid'],
    redirectUri: 'https://my-react.local:3000/',
    postLogoutRedirectUri: 'https://my-react.local:3000/'
});

authentication.run(() => {
ReactDOM.render(
    <React.StrictMode>
        <AuthorizationContextProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </AuthorizationContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
)});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
