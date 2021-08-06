import ProjectActionButtons from "./ProjectActionButtons";
import axios from "axios";
import {useContext} from "react";
import AuthorizationContext from "../../Context/authorization_context";
import ShareStatus from "./ShareStatus";

const Project = props => {
    const authCtx = useContext(AuthorizationContext);

    let date = new Date();
    if (props.datestmp !== undefined) {
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
                <div>
                    <h4>{props.project.summary}</h4>
                    <ProjectActionButtons projectId={props.project._id} editProjectHandler={props.editProjectHandler}
                                          deleteHandler={deleteHandler}/>
                </div>
            </header>
            <div className="content">
                <div>
                    <img alt="showcase"
                         src={"https://my-react.local:3000/v1/photos/" + props.project.showcase_photo_id}/>
                    <div className="project-details">
                        <b>{props.project.location} - {month} {day} {year}</b><br/>
                        {props.project.description}<br/><br/>
                        <ShareStatus project={props.project}/>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Project;