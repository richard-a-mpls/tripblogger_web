import {Card} from "react-bootstrap";
import React, {useState} from "react";
import '../UI/Global.css'

const ProjectDay = (props) => {

    const [expanded, setExpanded] = useState(false);

    let date = new Date();
    if (props.projectDay !== undefined) {
        date = new Date(props.projectDay.datestmp.split("-"));
    }
    const month = date.toLocaleString('en-US', {month: 'long'});
    const day = date.toLocaleString('en-US', {day: '2-digit'});
    const year = date.getFullYear();

    const switchExpandedHandler = (event) => {
        event.preventDefault();
        if (expanded) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }

    return (
        <div className="bform-control">
            <Card style={{marginBottom: '5px'}}>
                <Card.Header>
                    <h6 className="breadcrumb-text">
                        {month} {day} {year} - {props.projectDay.summary}
                    </h6>
                    <form className="breadcrumb-actions" onSubmit={switchExpandedHandler}>
                        {expanded && <div>
                            <button className="bform-control action-button-group" type="submit">Collapse</button>
                            <button className="bform-control action-button-group" type="button">Edit</button>
                        </div>}
                        {!expanded && <div>
                            <button className="bform-control action-button-group" type="submit">Expand</button>
                        </div>}
                    </form>

                </Card.Header>
                {expanded &&
                <div>
                    <Card.Body>
                        <Card.Text>
                            <b>{props.projectDay.location}</b><br/>
                            {props.projectDay.description}<br/>
                            {props.projectDay.photos && props.projectDay.photos.map((photoId) =>
                                <img style={{display: "block", marginLeft: "5px", marginRight: "5px", marginBottom: "5px"}} key={photoId}
                                     alt="showcase" className="details-img"
                                     src={"https://my-react.local:3000/v1/photos/" + photoId}/>
                            )}
                        </Card.Text>
                    </Card.Body>
                </div>
                }
            </Card>
        </div>
    );
}

export default ProjectDay;