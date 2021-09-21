import React from "react";
import {useMsal} from "@azure/msal-react";

const LogoutButton = () => {

    const { instance } = useMsal();

    const endSessionHandler = () => {
        instance.logoutPopup().catch(e => {
            console.error(e);
        });
    }

    return (
        <>
            <button type="button" onClick={endSessionHandler}>Log Out</button>
        </>
    );
};

export default React.memo(LogoutButton);