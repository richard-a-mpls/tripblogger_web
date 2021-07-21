import {Card} from "react-bootstrap";
import '../UI/Global.css'
import ProjectDay from "./ProjectDay";

const ViewProject = (props) => {

    const switchEditHandler = (event) => {
        event.preventDefault();
        props.editProjectHandler(props.editingProject._id);
    }

    return (
        <>
            <div className="main-body">
                <div className="main-body-header">
                    <h5>{props.editingProject.summary}</h5>
                    <form className="wb-form-control" onSubmit={switchEditHandler}>
                        <button type="submit">Edit</button>
                    </form>
                </div>
                <div className="main-body-text">
                    <img alt="showcase"
                         src={"https://my-react.local:3000/v1/photos/" + props.editingProject.showcase_photo_id}/>
                    <div className="project-details">
                        <h6>{props.editingProject.location}</h6>
                        <p>{props.editingProject.description}</p>
                        <p><i>
                            {(props.editingProject.share_with === "private") && "This project is only viewable by you."}
                            {(props.editingProject.share_with === "connections" && props.editingProject.published) && "Only you and your connections can view this project."}
                            {(props.editingProject.share_with === "connections" && !props.editingProject.published) && "Once published, only you and your connections can view this project."}
                            {(props.editingProject.share_with === "public" && props.editingProject.published) && "This project is viewable by everyone."}
                            {(props.editingProject.share_with === "public" && !props.editingProject.published) && "Once published, this project will be viewable by everyone."}
                        </i></p>
                    </div>
                </div>
            </div>

            {props.editingProject.project_days !== undefined && props.editingProject.project_days.map((projectDay) => (
                <ProjectDay projectDay={projectDay}/>
            ))}
        </>
    );
}

export default ViewProject;