import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../../store/profile-slice";
import styles from "../Projects/Project.module.css";

const EditProfile = (props) => {

    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.profileSlice.userProfile);

    const [profileName, setProfileName] = useState(userProfile.profile_name);

    const cancelEditProfileHandler = () => {
        props.showWelcomePage();
    };

    const submitEditProfileHandler = (event) => {
        dispatch(updateProfile(userProfile._id, {"profile_name": profileName}))
        props.showWelcomePage();
    };

    const profileNameChangeHandler = (event) => {
        setProfileName(event.target.value);
    };

    return (
        <main style={{marginTop: "60px"}}>
            <button className={"fullwidth"} type="button" onClick={props.showWelcomePage}>Show Dashboard</button>
            <div className={styles.projectHeader}>
                <input className={styles.summary} type="text" value={profileName} onChange={profileNameChangeHandler}/>

                <div className={styles.actionButtons}>
                    <button onClick={submitEditProfileHandler} type="button">
                        <i className="fas fa-check"/>
                    </button>

                    <button onClick={cancelEditProfileHandler} className='cancel' type="button">
                        <i className="fas fa-times"/>
                    </button>
                </div>
            </div>
            <div className="content">
                <p className="note small">This is the name that is publicly visible on your projects.</p>
            </div>
        </main>
    );

};

export default EditProfile;