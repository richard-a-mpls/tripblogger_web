import React from "react";
import {useSelector} from "react-redux";

const ProfileImage = (props) => {
    const userProfile = useSelector(state => state.profileSlice.userProfile);
    console.log(userProfile.profile_img);
    return (<>
            {userProfile && userProfile.profile_img &&
            <img alt="avatar" src={`/v1/photos/${userProfile.profile_img}`} className={props.className}/>}
            {!userProfile && !userProfile.profile_img &&
            <img alt="avatar" src="/v1/photos/61215421878dc8e7d6c3b217" className={props.className}/>}
        </>);
}

export default ProfileImage;