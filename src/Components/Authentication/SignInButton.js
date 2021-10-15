import React from "react";
import {useMsal} from "@azure/msal-react";
import {loginRequest, resetPasswordRequest} from "../../authConfig";
import Button from '../UI/Button';

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const {instance} = useMsal();

    function handleLogin(instance) {
        instance.loginPopup(loginRequest).catch(e => {
            if (e.toString().indexOf("AADB2C90118") >= 0) {
                instance.loginRedirect(resetPasswordRequest).catch(e => {
                    console.error(e);
                });
            }
        });
    }

    return (
        <Button type="button" onClick={() => handleLogin(instance)}>Sign In</Button>
    );
}