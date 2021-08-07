import {useContext} from "react";
import AuthorizationContext from "../../Context/authorization_context";
import React from "react";

const LogoutUser = () => {

    const authCtx = useContext(AuthorizationContext);
    const endSessionHandler = (event) => {
        event.preventDefault();

        const requestOptions = {
            headers: {'Content-Type': 'application/json'}
        };

        fetch('https://my-react.local:3000/v1/logout/?apiToken=' + authCtx.apiToken, requestOptions)
            .then(response => response.json())
            .then(data => console.log("DATER: " + JSON.stringify(data)));
        authCtx.logoutHandler();
    }

    return (
        <form onSubmit={endSessionHandler}>
            <button type="submit">Log Out</button>
        </form>
    );
};

export default React.memo(LogoutUser);