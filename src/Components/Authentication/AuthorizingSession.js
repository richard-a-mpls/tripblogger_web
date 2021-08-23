import {useMsal} from "@azure/msal-react";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loginRequest} from "../../authConfig";
import {authorizeB2C, authorizeSession, STORAGE_APITOKEN} from "../../store/auth-slice";

const AuthorizingSession = () => {
    const {instance, accounts} = useMsal();
    const currentAccount = accounts[0];
    const dispatch = useDispatch();

    useEffect(() => {
        // login the user by getting an identity token and using to gain api token
        if (localStorage.getItem(STORAGE_APITOKEN)) {
            dispatch(authorizeSession());
            return;
        }
        const request = {
            ...loginRequest,
            account: currentAccount
        };
        instance.acquireTokenSilent(request).then((response) => {
            const accessToken = response.accessToken;
            dispatch(authorizeB2C(accessToken));
        });

    }, [dispatch, instance, currentAccount]);

    return (
        <>Authorizing Session...</>
    );
}

export default AuthorizingSession;