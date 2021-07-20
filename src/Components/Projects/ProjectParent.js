import NewProject from "./NewProject";
import ProjectList from "./ProjectList";
import {Card} from "react-bootstrap";
import '../UI/Global.css'
import React, {useState} from "react";
import EditProject from "./EditProject";
import axios from 'axios'
import ViewProject from "./ViewProject";

const ProjectParent = props => {

    const [pageState, setPageState] = useState('viewing');
    const [editingProject, setEditingProject] = useState('');

    const initNewProjectHandler = (event) => {
        event.preventDefault();
        setPageState('creating');
    }

    const viewProjectsHandler = (event) => {
        props.changePageState();
        setPageState('viewing');
    }

    const editProjectHandler = (projectId) => {
        loadEditingProject(projectId);
        setPageState('editing');
    }

    const viewProjectHandler = (projectId) => {
        loadEditingProject(projectId);
        setPageState('viewing_project');
    }

    const loadEditingProject = (projectId) => {
        axios.get('http://localhost:8080/v1/projects/' + projectId, {
            headers: {Authorization: `Bearer ${props.apiToken}`}
        })
            .then(response => {
                setEditingProject(response.data);
            });
    }

    const resetEditingProject = (prj) => {
        setEditingProject(prj);
        setPageState('viewing_project');
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
                        {(pageState === "editing" || pageState === "viewing_project") &&
                        <button type="button" onClick={viewProjectsHandler}>All Projects</button>}
                    </form>
                </div>
            </Card.Header>
            <Card.Body style={{backgroundColor: "#fcfcfc"}}>
                <Card.Text>
                    {pageState === "creating" &&
                    <NewProject addToProjectList={props.addToProjectList} viewProjectsHandler={viewProjectsHandler}
                                changePageState={props.changePageState}
                                viewProject={resetEditingProject}
                                apiToken={props.apiToken}/>}
                    {pageState === "viewing" &&
                    <ProjectList removeProject={props.removeProject} projectList={props.projectList}
                                 changePageState={props.changePageState} apiToken={props.apiToken}
                                 editProjectHandler={viewProjectHandler}/>}
                    {pageState === "editing" &&
                    <EditProject
                        editingProject={editingProject}
                        viewProjectHandler={viewProjectHandler}
                        resetProject={resetEditingProject}
                        apiToken={props.apiToken}/>}
                    {pageState === "viewing_project" &&
                    <ViewProject
                        editProjectHandler={editProjectHandler}
                        editingProject={editingProject}
                    />}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProjectParent;