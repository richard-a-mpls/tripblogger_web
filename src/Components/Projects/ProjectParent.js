import NewProject from "./NewProject";
import ProjectList from "./ProjectList";
import {Card} from "react-bootstrap";
import '../UI/Global.css'
import React, {useState} from "react";

const ProjectParent = props => {

    const [pageState, setPageState] = useState('viewing');

    const initNewProjectHandler = (event) => {
        event.preventDefault();
        setPageState('creating');
    }

    const viewProjectsHandler = (event) => {
        setPageState('viewing');
    }

    return (
        <Card>
            <Card.Header>
                <div className="bform-control">
                    <h2 className="breadcrumb-text">My Projects</h2>
                    <form className="breadcrumb-actions" onSubmit={initNewProjectHandler}>
                        <button type="button" onClick={props.showWelcomePage}>Show Dashboard</button>
                        {pageState === "viewing" && <button type="submit">Create a New Project</button>}
                        {pageState === "creating" && <button className="bform-control cancel-button" type="button"
                                                             onClick={viewProjectsHandler}>Cancel Create a New Project
                        </button>}
                    </form>
                </div>
            </Card.Header>
            <Card.Body style={{backgroundColor: "#fcfcfc"}}>
                <Card.Text>
                    {pageState === "creating" &&
                    <NewProject addToProjectList={props.addToProjectList} viewProjectsHandler={viewProjectsHandler}
                                changePageState={props.changePageState}
                                apiToken={props.apiToken}/>}
                    {pageState === "viewing" &&
                    <ProjectList removeProject={props.removeProject} projectList={props.projectList}
                                 changePageState={props.changePageState} apiToken={props.apiToken}/>}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProjectParent;