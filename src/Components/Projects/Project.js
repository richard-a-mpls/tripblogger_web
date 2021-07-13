import {Card} from "react-bootstrap";
import DeleteButton from "./DeleteButton";
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

    return (
        <Card style={{width: 'auto', marginBottom: '15px'}}>
            <Card.Header>
                <div className="bform-control project-control">
                    <h2>{props.summary}</h2>
                    <DeleteButton deleteHandler={deleteHandler}/>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <label>Description:</label> {props.description}<br/>
                    <label>Location:</label> {props.location}<br/>
                    <label>Published:</label> {props.published.toString()}<br/>
                    <label>Share With:</label> {props.share_with}<br/>
                </Card.Text>

            </Card.Body>
            <Card.Footer>
                ID: {props.id} <br/>
                Profile ID: {props.profile_id}<br/>
            </Card.Footer>
        </Card>
    );
}

export default Project;