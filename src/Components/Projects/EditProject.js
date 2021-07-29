import React, {useContext, useState} from "react";
import axios from "axios";
import AuthorizationContext from "../../Context/authorization_context";

const EditProject = (props) => {
    const authCtx = useContext(AuthorizationContext);
    const [summary, setSummary] = useState(props.editingProject.summary);
    const [description, setDescription] = useState(props.editingProject.description);
    const [location, setLocation] = useState(props.editingProject.location);
    const [published, setPublished] = useState(props.editingProject.published);
    const [shareWith, setShareWith] = useState(props.editingProject.share_with);

    const submitEditHandler = (event) => {
        event.preventDefault();
        const formData = {
            "summary": summary,
            "description": description,
            "location": location,
            "published": published,
            "share_with": shareWith
        };
        axios.patch('http://localhost:8080/v1/me/projects/' + props.editingProject._id, formData, { // receive two parameter endpoint url ,form data
            headers: {Authorization: `Bearer ${authCtx.apiToken}`}
        })
            .then(response => {
                props.resetProject(response.data);
                props.updateProjectList(response.data);
            });
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
        console.log (props.editingProject)
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
        <main>
            <form className="wb-form-control">
                <header>
                    <input type="text" className="summary" onChange={summaryChangeHandler} value={summary}/>
                    <form>
                        <button className="cancel" type="button"
                                onClick={cancelEditHandler}>Cancel Edit
                        </button>
                    </form>
                </header>
                <div className="content">
                    <div>
                        <img alt="showcase"
                             src=""/>
                        <div className="project-details">
                            <label>Location:</label>
                            <input type="text" onChange={locationChangeHandler} value={location}/>
                            <label>Description:</label>
                            <input type="text" onChange={descriptionChangeHandler} value={description}/>
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
                        </div>
                    </div>
                    <div style={{display: "inline-block", marginTop: "25px"}}>
                        <button className="cancel" type="button"
                                onClick={cancelEditHandler}>Cancel
                        </button>
                        <button type="submit" onClick={submitEditHandler}>Submit</button>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default EditProject;