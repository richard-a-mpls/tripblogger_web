import React from "react";
import PublicProjectsList from "../Projects/PublicProjectsList";
import {useSelector} from "react-redux";
import Button from '../UI/Button';

const WelcomeMessage = (props) => {

    const userProfile = useSelector(state => state.profileSlice.userProfile);

    return (
        <main className="center">
            <Button className="fullwidth" onClick={props.changePageState}>
                Manage or create new Projects, {userProfile.profile_name}?
            </Button>
            <PublicProjectsList/>
        </main>
    );
}

export default WelcomeMessage;