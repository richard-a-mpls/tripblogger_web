import {Card} from "react-bootstrap";
import ProjectActionButtons from "./ProjectActionButtons";
import '../UI/Global.css'
import './Project.css'

const Project = props => {

    const deleteHandler = (event) => {
        event.preventDefault();
        fetch('https://my-react.local:3000/v1/me/projects/' + props.id, {
            method: 'delete',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.apiToken
            })
        })
            .then(response => response.json())
            .then(data => console.log(data));
        props.removeProject(props.id)
    }

    const date = new Date(props.days[0].datestmp.split("-"));
    const month = date.toLocaleString('en-US', {month: 'long'});
    const day = date.toLocaleString('en-US', {day: '2-digit'});
    const year = date.getFullYear();


    return (
        <div className="bform-control">
            <Card style={{width: 'auto', marginBottom: '15px'}}>
                <Card.Header>
                    <div className="bform-control project-control">
                        <h3>{props.summary}</h3>
                        <ProjectActionButtons deleteHandler={deleteHandler}/>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>

                        <img alt="showcase photo" className="details-img" src={"https://my-react.local:3000/v1/photos/" + props.photo_id}/>
                        <div className="details-right">
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
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Project;