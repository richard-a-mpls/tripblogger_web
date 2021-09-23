import React from "react";
import PublicProjectsList from "../Projects/PublicProjectsList";
import {useSelector} from "react-redux";
import Button from '../UI/Button';

const WelcomeMessage = (props) => {

    const userProfile = useSelector(state => state.profileSlice.userProfile);

    return (
        <main>
            <Button decorator="fullwidth" onClick={props.changePageState}>
                More to share, {userProfile.profile_name}?
            </Button>
            <PublicProjectsList/>
        </main>
    );
}

export default WelcomeMessage;