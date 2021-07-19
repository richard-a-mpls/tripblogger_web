import FacebookLogin from 'react-facebook-login';

import './AuthenticateUser.css'

const AuthenticateUser = (props) => {
    const responseFacebook = (response) => {
        console.log(response);
        props.setFbInfo(response, response.picture.data.url);
        if (response.accessToken) {
            const requestOptions = {
                method: 'POST',
                mode: "cors",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"identity_token": response.accessToken})
            };
            try {
                fetch('https://my-react.local:3000/v1/authorize', requestOptions)
                    .then(response => response.json())
                    .then(dataResp => props.setApiSession(dataResp));
            } catch (e) {
                console.log("Exception found: :" + e);
            }
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