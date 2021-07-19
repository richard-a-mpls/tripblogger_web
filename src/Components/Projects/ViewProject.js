import {Card} from "react-bootstrap";
import '../UI/Global.css'
import ProjectDay from "./ProjectDay";

const ViewProject = (props) => {

    const switchEditHandler = (event) => {
        event.preventDefault();
        props.editProjectHandler(props.editingProject._id);
    }

    return (
        <div className="bform-control">
            <Card style={{width: 'auto', marginBottom: '15px'}}>
                <Card.Header>
                    <div className="bform-control project-control">
                        <h3 className="breadcrumb-text">{props.editingProject.summary}</h3>
                        <form className="breadcrumb-actions" onSubmit={switchEditHandler}>
                            <button type="submit">Edit</button>
                        </form>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <img alt="showcase" className="details-img"
                             src={"https://my-react.local:3000/v1/photos/" + props.editingProject.showcase_photo_id}/>
                        <div className="details-right">
                            <b>{props.editingProject.location}</b><br/>
                            {props.editingProject.description}<br/><br/>
                            <i>
                                {(props.editingProject.share_with === "private") && "This project is only viewable by you."}
                                {(props.editingProject.share_with === "connections" && props.editingProject.published) && "Only you and your connections can view this project."}
                                {(props.editingProject.share_with === "connections" && !props.editingProject.published) && "Once published, only you and your connections can view this project."}
                                {(props.editingProject.share_with === "public" && props.editingProject.published) && "This project is viewable by everyone."}
                                {(props.editingProject.share_with === "public" && !props.editingProject.published) && "Once published, this project will be viewable by everyone."}
                            </i>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
            {props.editingProject.project_days !== undefined && props.editingProject.project_days.map((projectDay) => (
                <ProjectDay projectDay={projectDay}/>
            ))}
        </div>
    );
}

export default ViewProject;