import NewProject from "./NewProject";
import ProjectList from "./ProjectList";
import {Card} from "react-bootstrap";
import '../UI/Global.css'
import React, {useEffect, useState} from "react";
import EditProject from "./EditProject";
import axios from 'axios'
import ViewProject from "./ViewProject";

const ProjectParent = props => {

    const [pageState, setPageState] = useState('viewing');
    const [editingProject, setEditingProject] = useState('');
    const [projectList, setProjectList] = useState([]);

    // project list functions
    useEffect(() => {
        axios.get('https://my-react.local:3000/v1/me/projects', {
            headers: {Authorization: `Bearer ${props.apiToken}`}
        })
            .then(response => {
                setProjectList(response.data);
                console.log("got project list");
            });
    }, []);

    const addToProjectList = (addProject) => {
        setProjectList([addProject, ...projectList]);
    }

    const updateProjectList = (updatedProject) => {
        const newProjects = [];
        projectList.forEach(prj => {
            newProjects.push(prj._id === updatedProject._id ? updatedProject : prj);
        })
        setProjectList(newProjects);
    }

    const removeProject = (idToRemove) => {
        setProjectList(projectList.filter((prj => {
            return prj._id !== idToRemove;
        })));
    }

    const initNewProjectHandler = (event) => {
        event.preventDefault();
        setPageState('creating');
    }

    const viewProjectsHandler = (event) => {
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
                    <NewProject addToProjectList={addToProjectList} viewProjectsHandler={viewProjectsHandler}
                                changePageState={viewProjectsHandler}
                                viewProject={resetEditingProject}
                                apiToken={props.apiToken}/>}
                    {pageState === "viewing" &&
                    <ProjectList removeProject={removeProject} projectList={projectList}
                                 changePageState={viewProjectsHandler} apiToken={props.apiToken}
                                 editProjectHandler={viewProjectHandler}/>}
                    {pageState === "editing" &&
                    <EditProject
                        editingProject={editingProject}
                        viewProjectHandler={viewProjectHandler}
                        resetProject={resetEditingProject}
                        updateProjectList={updateProjectList}
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