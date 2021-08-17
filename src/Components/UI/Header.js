import LogoutUser from "../Authentication/LogoutUser";
import React from "react";
import {uiActions} from "../../store/ui-slice";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {

    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.authSlice.userProfile);

    const editProfileClickHandler = () => {
        dispatch(uiActions.changePageState("edit_profile"));
    }

    return (
        <header className="wb-form-control">
            <div className="left-item">
                <button className="button-profile" onClick={editProfileClickHandler}>
                    <img alt="avatar" src={localStorage.getItem('profileUrl')} className="profile-pic"/>&nbsp;{userProfile.profile_name}
                </button>
            </div>
            <div className="right-item">
                <LogoutUser/>
            </div>
        </header>
    );
};

export default React.memo(Header);