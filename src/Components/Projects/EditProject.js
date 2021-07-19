import React, {useState} from "react";
import {Card} from "react-bootstrap";
import '../UI/Global.css'
import './Project.css'
import axios from "axios";

const EditProject = (props) => {

    const [summary, setSummary] = useState(props.editingProject.summary);
    const [description, setDescription] = useState(props.editingProject.description);
    const [location, setLocation] = useState(props.editingProject.location);
    const [published, setPublished] = useState(props.editingProject.published);
    const [shareWith, setShareWith] = useState(props.editingProject.share_with);

    const submitEditHandler = (event) => {
        const formData = {
            "summary": summary,
            "description": description,
            "location": location,
            "published": published,
            "share_with": shareWith
        };
        axios.patch('http://localhost:8080/v1/me/projects/' + props.editingProject._id, formData, { // receive two parameter endpoint url ,form data
            headers: {Authorization: `Bearer ${props.apiToken}`}
        })
            .then(response => props.resetProject(response.data));
    }

    const cancelEditHandler = (event) => {
        props.viewProjectHandler(props.editingProject._id)
    }

    const summaryChangeHandler = (event) => {
        setSummary(event.target.value);
    }
    const locationChangeHandler = (event) => {
        setLocation(event.target.value);
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    }
    const publishedChangeHandler = (event) => {
        setPublished(published ? false : true);
    }
    const sharePrivateHandler = (event) => {
        setShareWith("private");
    }
    const shareConnectionsHandler = (event) => {
        setShareWith("connections");
    }
    const sharePublicHandler = (event) => {
        setShareWith("public");
    }

    return (
        <div className="bform-control">
            <Card style={{width: 'auto', marginBottom: '15px'}}>
                <Card.Header>
                    <div className="bform-control project-control">
                        <form style={{width: '80%'}} className="breadcrumb-text">
                            <input type="text" onChange={summaryChangeHandler} value={summary}/>
                        </form>
                        <form className="breadcrumb-actions">
                            <button className="bform-control cancel-button" type="button"
                                    onClick={cancelEditHandler}>Cancel Edit
                            </button>
                        </form>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <img alt="showcase" className="details-img"
                             src={"https://my-react.local:3000/v1/photos/" + props.editingProject.showcase_photo_id}/>
                        <div className="details-right">
                            <form>
                                <label>Location:</label><input type="text" onChange={locationChangeHandler}
                                                               value={location}/><br/>
                                <label>Description:</label><input type="text" onChange={descriptionChangeHandler}
                                                                  value={description}/><br/>
                                <div style={{width: "150px", display: "inline-block"}}>
                                    <label>Published:</label>
                                </div>
                                <div style={{display: "inline-block"}}>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked={published}
                                               onChange={publishedChangeHandler}/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>

                                {published && <div>
                                    <div style={{width: "150px", display: "inline-block"}}>
                                        <label>Available To:</label>
                                    </div>
                                    <div style={{display: "inline-block"}}>
                                        <label onClick={sharePrivateHandler}
                                               className={shareWith === "private" ? "active" : "inactive"}>Only
                                            Me</label>
                                        <label onClick={shareConnectionsHandler}
                                               className={shareWith === "connections" ? "active" : "inactive"}>My
                                            Connections</label>
                                        <label onClick={sharePublicHandler}
                                               className={shareWith === "public" ? "active" : "inactive"}>Everyone</label>
                                    </div>
                                </div>}
                            </form>
                        </div>
                        <div>
                            <button className="bform-control cancel-button" type="button"
                                    onClick={cancelEditHandler}>Cancel
                            </button>
                            <button type="submit" onClick={submitEditHandler}>Submit</button>
                        </div>

                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EditProject;