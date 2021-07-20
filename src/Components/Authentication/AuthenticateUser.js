import FacebookLogin from 'react-facebook-login';

import './AuthenticateUser.css'
import axios from "axios";

const AuthenticateUser = (props) => {
    const responseFacebook = (response) => {
        console.log(response);
        props.setFbInfo(response, response.picture.data.url);
        if (response.accessToken) {
            axios.post(
                "http://localhost:8080/v1/authorize",
                JSON.stringify({"identity_token": response.accessToken}),
                {headers: {'Content-Type': 'application/json'}})
                .then(response => props.setApiSession(response.data));
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