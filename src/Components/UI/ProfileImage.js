import React from "react";
import {useSelector} from "react-redux";

const ProfileImage = (props) => {
    const userProfile = useSelector(state => state.profileSlice.userProfile);
    return (<>
            {userProfile && userProfile.profile_img &&
            <img alt="avatar" src={`${process.env.REACT_APP_PYTHON_API}/v1/photos/${userProfile.profile_img}`} className={props.className}/>}
        </>);
}

export default ProfileImage;