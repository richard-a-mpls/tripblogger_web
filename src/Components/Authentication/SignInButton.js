import React from "react";
import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../../authConfig";

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const {instance} = useMsal();

    function handleLogin(instance) {
        instance.loginPopup(loginRequest).catch(e => {
            console.error(e);
        });
    }

    return (
        <button type="button" onClick={() => handleLogin(instance)}>Sign In</button>
    );
}