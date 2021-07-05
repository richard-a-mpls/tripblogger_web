import React from "react";

const NewProject = (props) => {
    const cancelNewProjectHandler = () => {
        console.log("cancel new project");
        props.changePageState("welcome_message");
    };

    const submitProjectHandler = (event) => {
        event.preventDefault();
        console.log("submit new project");
    };

    return (
        <div>
            <h2>Create a new Project</h2>
            <p>
                Fill in the below info to create your new project.
            </p>
            <form onSubmit={submitProjectHandler}>
                <button type="button" onClick={cancelNewProjectHandler}>cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewProject;