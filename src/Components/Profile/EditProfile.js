import React from "react";

const EditProfile = (props) => {

    const cancelEditProfileHandler = () => {
        props.changePageState("welcome_message");
    }

    const submitEditProfileHandler = (event) => {
        event.preventDefault();
        console.log("Edit Profile");
    }

    return (
        <div>
            <p>here is where you'd go to edit your profile</p>
            <form onSubmit={submitEditProfileHandler}>
                <button type="button" onClick={cancelEditProfileHandler}>cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );

}

export default EditProfile;