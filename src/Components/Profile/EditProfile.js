import React, {useState} from "react";

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
    };

    const profileNameChangeHandler = (event) => {
        setProfileName(event.target.value);
    };

    return (
        <div>
            <p>here is where you'd go to edit your profile</p>
            <form onSubmit={submitEditProfileHandler}>
                <div>
                    <label>Name: </label>
                    <input type="text" value={profileName} onChange={profileNameChangeHandler}/>
                    <p className="small">This is the name that is publicly visible on your projects.</p>
                </div>
                <div>
                    <label>Connections:</label>
                </div>
                <button type="button" onClick={cancelEditProfileHandler}>cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );

};

export default EditProfile;