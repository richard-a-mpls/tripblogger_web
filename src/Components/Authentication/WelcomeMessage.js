import React from "react";
import PublicProjectsList from "../Projects/PublicProjectsList";
import {useSelector} from "react-redux";

const WelcomeMessage = (props) => {

    const userProfile = useSelector(state => state.profileSlice.userProfile);

    return (
        <main className="center">
            <button className="fullwidth" onClick={props.changePageState}>
                Manage or create new Projects, {userProfile.profile_name}?
            </button>
            <PublicProjectsList/>
        </main>
    );
}

export default WelcomeMessage;