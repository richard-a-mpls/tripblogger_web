import React, {useState} from "react";
import '../UI/Global.css'

import {Card} from "react-bootstrap";

const EditProfile = (props) => {

    const [profileName, setProfileName] = useState(props.userProfile.profile_name);
    //const [connections, setConnections] = useState();

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
        <div className="bform-control">
            <Card>
                <Card.Header>
                    <h2 className="breadcrumb-text">Edit Profile</h2>
                    <form className="breadcrumb-actions">
                        <button type="button" onClick={props.showWelcomePage}>Show Dashboard</button>
                    </form>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <form onSubmit={submitEditProfileHandler}>
                            <label>Name:</label>
                            <input type="text" value={profileName} onChange={profileNameChangeHandler}/>
                            <p className="small">This is the name that is publicly visible on your projects.</p>
                            <div>
                                <label>Connections:</label>
                            </div>
                            <button className="bform-control cancel-button" type="button"
                                    onClick={cancelEditProfileHandler}>Cancel
                            </button>
                            <button type="submit">Submit</button>
                        </form>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

};

export default EditProfile;