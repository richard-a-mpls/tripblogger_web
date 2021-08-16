import LogoutUser from "../Authentication/LogoutUser";
import React, {useContext} from "react";
import AuthorizationContext from "../../Context/authorization_context";

const Header = () => {
    const authCtx = useContext(AuthorizationContext);

    return (
        <header className="wb-form-control">
            <div className="left-item">
                <button className="button-profile" onClick={authCtx.editProfileClickHandler}>
                    <img alt="avatar" src={localStorage.getItem('profileUrl')} className="profile-pic"/>&nbsp;{authCtx.userProfile.profile_name}
                </button>
            </div>
            <div className="right-item">
                <LogoutUser/>
            </div>
        </header>
    );
};

export default React.memo(Header);