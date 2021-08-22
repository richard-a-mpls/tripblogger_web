import {useDispatch} from "react-redux";
import {authorizeB2C} from "../../store/auth-slice";
import {useEffect} from "react";
import authentication from 'react-azure-b2c';

const AuthenticateUser = () => {

    const dispatch = useDispatch();

    const accessToken = authentication.getAccessToken();

    useEffect(() => {
        dispatch(authorizeB2C(accessToken.idToken.rawIdToken));
    }, [dispatch, accessToken]);

    return <p>Authorizing...</p>

}

export default AuthenticateUser;