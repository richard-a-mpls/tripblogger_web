import React from "react";

const ProfileImage = (props) => {
    return (<>
            {localStorage.getItem('profileUrl') &&
            <img alt="avatar" src={localStorage.getItem('profileUrl')} className={props.className}/>}
            {!localStorage.getItem('profileUrl') &&
            <img alt="avatar" src="/v1/photos/61215421878dc8e7d6c3b217" className={props.className}/>}
        </>);
}

export default ProfileImage;