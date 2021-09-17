import React from "react";
import {useSelector} from "react-redux";
import {photosEndpoint} from "../../store/upload-slice";

const ProfileImage = (props) => {
    const userProfile = useSelector(state => state.profileSlice.userProfile);
    return (<>
            {userProfile && userProfile.profile_img &&
            <img alt="avatar" src={`${photosEndpoint}/${userProfile.profile_img}`} className={props.className}/>}
        </>);
}

export default ProfileImage;