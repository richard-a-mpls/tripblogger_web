import React, {useState} from "react";
import '../UI/Global.css'

import {Card} from "react-bootstrap";

const EditProfile = (props) => {

    const [profileName, setProfileName] = useState(props.userProfile.profile_name);

    const cancelEditProfileHandler = () => {
        props.changePageState("welcome_message");
    };

    const submitEditProfileHandler = (event) => {
        event.preventDefault();
        const updateValue = {"profile_name": profileName}
        fetch('http://localhost:8080/v1/profile/' + props.userProfile._id, {
            method: 'patch',
            body: JSON.stringify(updateValue),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.apiToken
            })
        })
            .then(response => response.json())
            .then(data => props.refreshUserProfile(data));
        props.changePageState("welcome_message");
    };

    const profileNameChangeHandler = (event) => {
        setProfileName(event.target.value);
    };

    return (
        <div className="main-body">
            <div className="main-body-header">
                <h3>Edit Profile</h3>
                <form className="wb-form-control">
                    <button type="button" onClick={props.showWelcomePage}>Show Dashboard</button>
                </form>
            </div>
            <div className="main-body-text">
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
        </div>
);

};

export default EditProfile;