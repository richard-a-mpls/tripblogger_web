import LogoutUser from "../Authentication/LogoutButton";
import React from "react";
import {uiActions} from "../../store/ui-slice";
import {useDispatch, useSelector} from "react-redux";
import {SignInButton} from "../Authentication/SignInButton";
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
                    <img alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Eo_circle_blue-grey_letter-t.svg/1024px-Eo_circle_blue-grey_letter-t.svg.png" className="profile-pic"/>
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