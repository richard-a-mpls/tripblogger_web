import FacebookLogin from 'react-facebook-login';

import {useContext} from "react";
import AuthorizationContext from "../../Context/authorization_context";
import {useDispatch} from "react-redux";
import {authorizeFacebook} from "../../store/auth-slice";

const AuthenticateUser = () => {

    const authCtx = useContext(AuthorizationContext)
    const dispatch = useDispatch();

    const responseFacebook = (response) => {
        localStorage.setItem('profileUrl', response.picture.data.url);
        if (response.accessToken) {
            dispatch(authorizeFacebook(response.accessToken))
        } else {
        }
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