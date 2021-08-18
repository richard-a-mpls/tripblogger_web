import FacebookLogin from 'react-facebook-login';
import {useDispatch} from "react-redux";
import {authorizeFacebook} from "../../store/auth-slice";

const AuthenticateUser = () => {

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