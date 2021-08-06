import ProjectDay from "./ProjectDay";
import ShareStatus from "./ShareStatus";
import ProjectActionButtons from "./ProjectActionButtons";
import axios from "axios";
import {useContext} from "react";
import AuthorizationContext from "../../Context/authorization_context";

const Project = (props) => {
    const authCtx = useContext(AuthorizationContext);

    let date = new Date();
    if (props.project.datestmp !== undefined) {
        date = new Date(props.project.datestmp.split("-"));
    }
    const month = date.toLocaleString('en-US', {month: 'long'});
    const day = date.toLocaleString('en-US', {day: '2-digit'});
    const year = date.getFullYear();

    const deleteHandler = (event) => {
        event.preventDefault();
        axios.delete('https://my-react.local:3000/v1/me/projects/' + props.project._id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authCtx.apiToken
                }
            })
            .then(response => console.log(response.data));
        props.removeProject(props.project._id);
    }

    return (
        <main>
            <header>
                <h5>{props.project.summary}</h5>
                {props.view === "list" &&
                <ProjectActionButtons projectId={props.project._id} editProjectHandler={props.editProjectHandler}
                                      deleteHandler={deleteHandler}/>}
            </header>
            <div className="content">
                <img alt="showcase"
                     src={"https://my-react.local:3000/v1/photos/" + props.project.showcase_photo_id}/>
                <div className="project-details">
                    <h6>{props.project.location} - {month} {day} {year}</h6><br/>
                    <p>{props.project.description}</p><br/>
                    <ShareStatus project={props.project}/>
                </div>
                <br/><br/>
                {props.view !== "list" && props.project.project_days !== undefined && props.project.project_days.map((projectDay) => (
                    <ProjectDay projectDay={projectDay}/>
                ))}
            </div>
        </main>

    );
}

export default Project;