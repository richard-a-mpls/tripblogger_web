import FacebookLogin from 'react-facebook-login';

import axios from "axios";
import {useContext} from "react";
import AuthorizationContext from "../../Context/authorization_context";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/auth-slice";

const AuthenticateUser = () => {

    const authCtx = useContext(AuthorizationContext)
    const dispatch = useDispatch();

    const responseFacebook = (response) => {
        localStorage.setItem('profileUrl', response.picture.data.url);
        if (response.accessToken) {
            axios.post(
                "http://localhost:8080/v1/authorize",
                JSON.stringify({"identity_token": response.accessToken}),
                {headers: {'Content-Type': 'application/json'}})
                .then(response => dispatch(authActions.setApiToken(response.data.api_token)));
        } else {
        }
        authCtx.showWelcomePage();
    }

    return (
        <FacebookLogin
            appId="1004027110356208"
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile email"
            callback={responseFacebook}
            icon="fa-facebook"/>
    );
}

export default AuthenticateUser;