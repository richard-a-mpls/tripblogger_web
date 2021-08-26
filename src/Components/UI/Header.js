import LogoutUser from "../Authentication/LogoutUser";
import React from "react";
import {uiActions} from "../../store/ui-slice";
import {useDispatch, useSelector} from "react-redux";
import {SignInButton} from "../SignInButton";
import {useIsAuthenticated} from "@azure/msal-react";
import ProfileImage from "./ProfileImage";

const Header = () => {

    const isAuthenticated = useIsAuthenticated();
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.profileSlice.userProfile);

    const editProfileClickHandler = () => {
        dispatch(uiActions.changePageState("edit_profile"));
    }

    return (
        <header className="wb-form-control">
            <div className="left-item">
                {isAuthenticated &&
                <button className="button-profile" onClick={editProfileClickHandler}>
                    <ProfileImage className="profile-pic"/>
                    &nbsp;{userProfile.profile_name}
                </button>
                }
                {!isAuthenticated &&
                <div className="logoblock">
                    <img alt="logo" src="/v1/photos/61215421878dc8e7d6c3b217" className="profile-pic"/>
                    &nbsp;
                    Trip Blogger</div>
                }
            </div>
            <div className="right-item">
                {isAuthenticated && <LogoutUser/>}
                {!isAuthenticated && <SignInButton/>}
            </div>
        </header>
    );
};

export default React.memo(Header);