import LogoutUser from "../Authentication/LogoutButton";
import React from "react";
import {uiActions} from "../../store/ui-slice";
import {useDispatch, useSelector} from "react-redux";
import {SignInButton} from "../Authentication/SignInButton";
import {useIsAuthenticated} from "@azure/msal-react";
import ProfileImage from "./ProfileImage";
import Button from './Button';

import classes from './Header.module.css';

const Header = () => {

    const isAuthenticated = useIsAuthenticated();
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.profileSlice.userProfile);

    const editProfileClickHandler = () => {
        dispatch(uiActions.changePageState("edit_profile"));
    }

    return (
        <header>
            <div className={classes.leftitem}>
                {isAuthenticated &&
                <Button onClick={editProfileClickHandler}>
                    <ProfileImage className={classes.profilepic}/>
                    &nbsp;{userProfile.profile_name}
                </Button>
                }
                {!isAuthenticated &&
                <div className={classes.logoblock}>
                    <img alt="logo" src="/tb.png" className={classes.profilepic}/>
                    &nbsp;
                    Trip Blogger</div>
                }
            </div>
            <div className={classes.rightitem}>
                {isAuthenticated && <LogoutUser/>}
                {!isAuthenticated && <SignInButton/>}
            </div>
        </header>
    );
};

export default React.memo(Header);