import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../../store/profile-slice";
import styles from "../Projects/Project.module.css";
import SingleUpload from "../PhotoGroups/SingleUpload";
import Button from '../UI/Button';

const EditProfile = (props) => {

    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.profileSlice.userProfile);
    const [profileName, setProfileName] = useState(userProfile.profile_name);

    const cancelEditProfileHandler = () => {
        props.showWelcomePage();
    };

    const submitEditProfileHandler = () => {
        dispatch(updateProfile(userProfile._id, {"profile_name": profileName}))
        props.showWelcomePage();
    };

    const profileNameChangeHandler = (event) => {
        setProfileName(event.target.value);
    };

    const updatePhotoId = (id) => {
        dispatch(updateProfile(userProfile._id, {"profile_img": id}))
    }

    return (
        <main>
            <Button className={"fullwidth"} type="button" onClick={props.showWelcomePage}>Show Dashboard</Button>
            <div className={styles.projectHeader}>
                <input className={styles.summary} type="text" value={profileName} onChange={profileNameChangeHandler}/>

                <div className={styles.actionButtons}>
                    <Button onClick={submitEditProfileHandler} type="button">
                        <i className="fas fa-check"/>
                    </Button>

                    <Button onClick={cancelEditProfileHandler} className='cancel' type="button">
                        <i className="fas fa-times"/>
                    </Button>
                </div>
            </div>
            <div className="content">
                <p className="note small">This is the name that is publicly visible on your projects.</p>
                <SingleUpload updateData={updatePhotoId} photoId={userProfile.profile_img}/>
            </div>
        </main>
    );

};

export default EditProfile;