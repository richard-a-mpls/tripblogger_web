import ProjectList from "./ProjectList";
import React, {useEffect, useState, useCallback} from "react";
import axios from 'axios'
import Project from "./Project";
import {STORAGE_APITOKEN} from "../../Context/authorization_context";

const ProjectParent = props => {
    const [pageState, setPageState] = useState('viewing');
    const [editingProject, setEditingProject] = useState('');
    const [projectList, setProjectList] = useState([]);

    const defaultProject = {};

    // project list functions
    useEffect(() => {
        axios.get('https://my-react.local:3000/v1/me/projects', {
            headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`}
        })
            .then(response => {
                console.log(response.data);
                setProjectList(response.data);
                console.log("got project list");
            });
    }, []);

    const updateProjectList = useCallback((updatedProject) => {
        const newProjects = [];
        let updateApplied = false;
        projectList.forEach(prj => {
            newProjects.push(prj._id === updatedProject._id ? updatedProject : prj);
            if (prj._id === updatedProject._id) {
                updateApplied = true;
            }
        })

        if (!updateApplied) {
            // add as first element, must be a new create
            newProjects.unshift(updatedProject);
        }

        setProjectList(newProjects);
    }, [projectList]);

    const removeProject = (idToRemove) => {
        setProjectList(projectList.filter((prj => {
            return prj._id !== idToRemove;
        })));
        setPageState('viewing');
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
            headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`}
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
        <main>
            <header>
                <h3>My Projects</h3>
                <form onSubmit={initNewProjectHandler} className="wb-form-control">
                    <button type="button" onClick={props.showWelcomePage}>Dashboard</button>
                    {pageState === "viewing" && <button type="submit">New Project</button>}
                    {pageState === "creating" && <button className="cancel" type="button"
                                                         onClick={viewProjectsHandler}>Cancel
                    </button>}
                    {(pageState === "editing" || pageState === "viewing_project") &&
                    <button type="button" onClick={viewProjectsHandler}>All Projects</button>}
                </form>
            </header>
            <div className="content">
                {pageState === "viewing" &&
                <ProjectList removeProject={removeProject} projectList={projectList}
                             changePageState={viewProjectsHandler}
                             editProjectHandler={viewProjectHandler}/>}
                {pageState === "viewing_project" &&
                <Project
                    removeProject={removeProject}
                    editProjectHandler={editProjectHandler}
                    resetProject={resetEditingProject}
                    updateProjectList={updateProjectList}
                    project={editingProject}
                    view="edit"
                />}
                {pageState === "creating" &&
                <Project
                    removeProject={removeProject}
                    updateProjectList={updateProjectList}
                    resetProject={resetEditingProject}
                    project={defaultProject}
                    view="create"
                />
                }

            </div>
        </main>
    );
}

export default ProjectParent;