import FacebookLogin from 'react-facebook-login';

import axios from "axios";
import {useContext} from "react";
import AuthorizationContext from "../../Context/authorization_context";

const AuthenticateUser = () => {

    const authCtx = useContext(AuthorizationContext)
    const responseFacebook = (response) => {
        localStorage.setItem('profileUrl', response.picture.data.url);
        if (response.accessToken) {
            axios.post(
                "http://localhost:8080/v1/authorize",
                JSON.stringify({"identity_token": response.accessToken}),
                {headers: {'Content-Type': 'application/json'}})
                .then(
                    response => authCtx.setApiSession(response.data)
                );
        } else {
        }
    }

    return (
        <FacebookLogin
            appId="1004027110356208"
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile email"
            callback={responseFacebook}
            icon="fa-facebook"/>
    );
}

export default AuthenticateUser;