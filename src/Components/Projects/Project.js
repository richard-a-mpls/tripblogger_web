import {Card} from "react-bootstrap";

const Project = props => {
    return (
        <Card style={{width: 'auto'}}>
            <Card.Header>
                <h2>{props.summary}</h2>
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
                ID: {props.id} <br/> Profile ID: {props.profile_id}
            </Card.Footer>
        </Card>
    );
}

export default Project;