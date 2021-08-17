import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../../store/profile-slice";

const EditProfile = (props) => {

    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.profileSlice.userProfile);

    const [profileName, setProfileName] = useState(userProfile.profile_name);

    const cancelEditProfileHandler = () => {
        props.showWelcomePage();
    };

    const submitEditProfileHandler = (event) => {
        event.preventDefault();
        dispatch(updateProfile(userProfile._id, {"profile_name": profileName}))
        props.showWelcomePage();
    };

    const profileNameChangeHandler = (event) => {
        setProfileName(event.target.value);
    };

    return (
        <main>
            <header>
                <h3>Edit Profile</h3>
                <form className="wb-form-control">
                    <button type="button" onClick={props.showWelcomePage}>Show Dashboard</button>
                </form>
            </header>
            <div className="content">
                    <form className="wb-form-control" onSubmit={submitEditProfileHandler}>
                        <label>Name:</label>
                        <input type="text" value={profileName} onChange={profileNameChangeHandler}/>
                        <p className="note">This is the name that is publicly visible on your projects.</p>
                        <button className="cancel" type="button"
                                onClick={cancelEditProfileHandler}>Cancel
                        </button>
                        <button type="submit">Submit</button>
                    </form>
            </div>
        </main>
);

};

export default EditProfile;