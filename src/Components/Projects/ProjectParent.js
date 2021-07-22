import NewProject from "./NewProject";
import ProjectList from "./ProjectList";
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
    }, [props.apiToken]);

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
        <div className="main-body">
            <div className="main-body-header wb-form-control">
                <h3>My Projects</h3>
                <form onSubmit={initNewProjectHandler}>
                    <button type="button" onClick={props.showWelcomePage}>Show Dashboard</button>
                    {pageState === "viewing" && <button type="submit">Create a New Project</button>}
                    {pageState === "creating" && <button className="cancel" type="button"
                                                         onClick={viewProjectsHandler}>Cancel Create a New Project
                    </button>}
                    {(pageState === "editing" || pageState === "viewing_project") &&
                    <button type="button" onClick={viewProjectsHandler}>All Projects</button>}
                </form>
            </div>
            <div className="main-body-text">
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
            </div>
        </div>
    );
}

export default ProjectParent;