import ProjectActionButtons from "./ProjectActionButtons";
import '../UI/Global.css'
import './Project.css'
import axios from "axios";

const Project = props => {
    const date = new Date(props.days[0].datestmp.split("-"));
    const month = date.toLocaleString('en-US', {month: 'long'});
    const day = date.toLocaleString('en-US', {day: '2-digit'});
    const year = date.getFullYear();

    const deleteHandler = (event) => {
        event.preventDefault();
        axios.delete('https://my-react.local:3000/v1/me/projects/' + props.id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.apiToken
                }
            })
            .then(response => console.log(response.data));
        props.removeProject(props.id);
    }

    return (
        <div className="main-body">
            <div className="main-body-header wb-form-control">
                <div>
                    <h4>{props.summary}</h4>
                    <ProjectActionButtons projectId={props.id} editProjectHandler={props.editProjectHandler}
                                          deleteHandler={deleteHandler}/>
                </div>
            </div>
            <div className="main-body-text">
                <div>
                    <img alt="showcase"
                         src={"https://my-react.local:3000/v1/photos/" + props.photo_id}/>
                    <div className="project-details">
                        <b>{props.location} - {month} {day} {year}</b><br/>
                        {props.description}<br/><br/>
                        <i>
                            {(props.share_with === "private") && "This project is only viewable by you."}
                            {(props.share_with === "connections" && props.published) && "Only you and your connections can view this project."}
                            {(props.share_with === "connections" && !props.published) && "Once published, only you and your connections can view this project."}
                            {(props.share_with === "public" && props.published) && "This project is viewable by everyone."}
                            {(props.share_with === "public" && !props.published) && "Once published, this project will be viewable by everyone."}
                        </i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;