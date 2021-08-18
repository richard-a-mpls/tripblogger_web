import React from "react";
import {useDispatch} from "react-redux";
import {endSession} from "../../store/auth-slice";

const LogoutUser = () => {

    const dispatch = useDispatch();

    const endSessionHandler = (event) => {
        event.preventDefault();
        dispatch(endSession());
    }

    return (
        <form onSubmit={endSessionHandler}>
            <button type="submit">Log Out</button>
        </form>
    );
};

export default React.memo(LogoutUser);