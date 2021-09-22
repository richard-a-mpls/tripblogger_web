import React from "react";
import {useMsal} from "@azure/msal-react";
import Button from '../UI/Button';

const LogoutButton = () => {

    const {instance} = useMsal();

    const endSessionHandler = () => {
        instance.logoutPopup().catch(e => {
            console.error(e);
        });
    }

    return (
        <Button type="button" onClick={endSessionHandler}>Log Out</Button>
    );
};

export default React.memo(LogoutButton);